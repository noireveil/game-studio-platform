<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Get reviews for a game
     */
    public function index($gameId)
    {
        $game = Game::find($gameId);
        
        if (!$game) {
            return response()->json([
                'success' => false,
                'message' => 'Game not found'
            ], 404);
        }

        $reviews = Review::where('game_id', $gameId)
            ->with('user:id,username')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'gameId' => $review->game_id,
                    'userId' => $review->user_id,
                    'userName' => $review->user->username,
                    'rating' => $review->rating,
                    'comment' => $review->content,
                    'date' => $review->created_at->format('Y-m-d'),
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $reviews
        ]);
    }

    /**
     * Create a review
     */
    public function store(Request $request, $gameId)
    {
        $game = Game::find($gameId);
        
        if (!$game) {
            return response()->json([
                'success' => false,
                'message' => 'Game not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if user already reviewed this game
        $existingReview = Review::where('user_id', $request->user()->id)
            ->where('game_id', $gameId)
            ->first();

        if ($existingReview) {
            return response()->json([
                'success' => false,
                'message' => 'You have already reviewed this game'
            ], 400);
        }

        $review = Review::create([
            'game_id' => $gameId,
            'user_id' => $request->user()->id,
            'rating' => $request->rating,
            'content' => $request->comment,
        ]);

        $review->load('user:id,username');

        return response()->json([
            'success' => true,
            'message' => 'Review created successfully',
            'data' => [
                'id' => $review->id,
                'gameId' => $review->game_id,
                'userId' => $review->user_id,
                'userName' => $review->user->username,
                'rating' => $review->rating,
                'comment' => $review->content,
                'date' => $review->created_at->format('Y-m-d'),
            ]
        ], 201);
    }

    /**
     * Delete a review (own review only)
     */
    public function destroy(Request $request, $gameId, $reviewId)
    {
        $review = Review::where('id', $reviewId)
            ->where('game_id', $gameId)
            ->first();

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        // Only allow deleting own reviews (or admin)
        if ($review->user_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ]);
    }

    /**
     * Get all reviews (Admin only)
     */
    public function all()
    {
        $reviews = Review::with(['user:id,username', 'game:id,title'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'gameId' => $review->game_id,
                    'gameTitle' => $review->game ? $review->game->title : 'Unknown',
                    'userId' => $review->user_id,
                    'author' => $review->user ? $review->user->username : 'Unknown',
                    'rating' => $review->rating,
                    'comment' => $review->content,
                    'date' => $review->created_at->format('Y-m-d'),
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $reviews
        ]);
    }

    /**
     * Delete any review (Admin only)
     */
    public function adminDestroy($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ]);
    }
}
