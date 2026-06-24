<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Game;
use App\Models\Review;
use App\Models\Purchase;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get dashboard statistics
     */
    public function dashboard()
    {
        $totalUsers = User::where('role', 'user')->count();
        $totalGames = Game::count();
        $totalReviews = Review::count();
        $totalSales = Purchase::sum('price_at_purchase');
        $totalPurchases = Purchase::count();

        return response()->json([
            'success' => true,
            'data' => [
                'totalUsers' => $totalUsers,
                'totalGames' => $totalGames,
                'totalReviews' => $totalReviews,
                'totalSales' => $totalSales,
                'totalPurchases' => $totalPurchases,
            ]
        ]);
    }

    /**
     * Get all users
     */
    public function users()
    {
        $users = User::where('role', 'user')
            ->withCount('purchases')
            ->get()
            ->map(function ($user) {
                $totalSpent = Purchase::where('user_id', $user->id)->sum('price_at_purchase');
                return [
                    'id' => $user->id,
                    'name' => $user->username,
                    'email' => $user->email,
                    'role' => $user->role,
                    'games' => $user->purchases_count,
                    'spent' => '$' . number_format($totalSpent, 2),
                    'joined' => $user->created_at->format('Y-m-d'),
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    /**
     * Delete a user
     */
    public function deleteUser($id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        if ($user->role === 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete admin user'
            ], 403);
        }

        // Delete user's reviews and purchases first
        Review::where('user_id', $id)->delete();
        Purchase::where('user_id', $id)->delete();
        $user->tokens()->delete();
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Update user role
     */
    public function updateRole(Request $request, $id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $user->role = $request->role;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User role updated',
            'data' => $user
        ]);
    }
}
