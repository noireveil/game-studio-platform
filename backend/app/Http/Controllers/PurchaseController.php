<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    /**
     * Get user's purchased games
     */
    public function index(Request $request)
    {
        $purchases = Purchase::where('user_id', $request->user()->id)
            ->with('game')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $purchases
        ]);
    }

    /**
     * Purchase a game (single purchase only - 1 user can only buy 1 copy)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'game_id' => 'required|exists:games,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $userId = $request->user()->id;
        $gameId = $request->game_id;

        // Check if already purchased
        $existingPurchase = Purchase::where('user_id', $userId)
            ->where('game_id', $gameId)
            ->first();

        if ($existingPurchase) {
            return response()->json([
                'success' => false,
                'message' => 'You already own this game'
            ], 400);
        }

        // Get game price
        $game = Game::find($gameId);
        
        if (!$game->is_visible) {
            return response()->json([
                'success' => false,
                'message' => 'This game is not available for purchase'
            ], 400);
        }

        $purchase = Purchase::create([
            'user_id' => $userId,
            'game_id' => $gameId,
            'price_at_purchase' => $game->price,
        ]);

        $purchase->load('game');

        return response()->json([
            'success' => true,
            'message' => 'Purchase successful',
            'data' => $purchase
        ], 201);
    }

    /**
     * Purchase multiple games at once (cart checkout)
     */
    public function checkout(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'game_ids' => 'required|array|min:1',
            'game_ids.*' => 'exists:games,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $userId = $request->user()->id;
        $gameIds = $request->game_ids;

        // Check for already owned games
        $ownedGames = Purchase::where('user_id', $userId)
            ->whereIn('game_id', $gameIds)
            ->pluck('game_id')
            ->toArray();

        if (!empty($ownedGames)) {
            $ownedGameNames = Game::whereIn('id', $ownedGames)->pluck('title');
            return response()->json([
                'success' => false,
                'message' => 'You already own: ' . $ownedGameNames->implode(', ')
            ], 400);
        }

        // Check visibility
        $unavailableGames = Game::whereIn('id', $gameIds)
            ->where('is_visible', false)
            ->pluck('title');

        if ($unavailableGames->isNotEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'These games are not available: ' . $unavailableGames->implode(', ')
            ], 400);
        }

        DB::beginTransaction();
        try {
            $purchases = [];
            foreach ($gameIds as $gameId) {
                $game = Game::find($gameId);
                $purchase = Purchase::create([
                    'user_id' => $userId,
                    'game_id' => $gameId,
                    'price_at_purchase' => $game->price,
                ]);
                $purchase->load('game');
                $purchases[] = $purchase;
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Purchase successful',
                'data' => $purchases
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Purchase failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check if user owns a game
     */
    public function checkOwnership(Request $request, $gameId)
    {
        $owns = Purchase::where('user_id', $request->user()->id)
            ->where('game_id', $gameId)
            ->exists();

        return response()->json([
            'success' => true,
            'data' => [
                'owns' => $owns
            ]
        ]);
    }
}
