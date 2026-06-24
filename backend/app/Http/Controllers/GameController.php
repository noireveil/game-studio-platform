<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GameController extends Controller
{
    /**
     * Get all games (public - only visible games, admin - all games)
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // If admin, show all games. Otherwise, only visible ones
        if ($user && $user->role === 'admin') {
            $games = Game::orderBy('created_at', 'desc')->get();
        } else {
            $games = Game::where('is_visible', true)->orderBy('created_at', 'desc')->get();
        }

        return response()->json([
            'success' => true,
            'data' => $games
        ]);
    }

    /**
     * Get single game
     */
    public function show($id)
    {
        $game = Game::find($id);

        if (!$game) {
            return response()->json([
                'success' => false,
                'message' => 'Game not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $game
        ]);
    }

    /**
     * Create game (Admin only)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'required|string',
            'category' => 'required|string',
            'features' => 'sometimes|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $game = Game::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $request->image,
            'category' => $request->category,
            'rating' => $request->rating ?? 0,
            'features' => $request->features ?? [],
            'is_visible' => $request->is_visible ?? true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Game created successfully',
            'data' => $game
        ], 201);
    }

    /**
     * Update game (Admin only)
     */
    public function update(Request $request, $id)
    {
        $game = Game::find($id);

        if (!$game) {
            return response()->json([
                'success' => false,
                'message' => 'Game not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'image' => 'sometimes|string',
            'category' => 'sometimes|string',
            'rating' => 'sometimes|numeric|min:0|max:5',
            'features' => 'sometimes|array',
            'is_visible' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $game->update($request->only([
            'title', 'description', 'price', 'image', 
            'category', 'rating', 'features', 'is_visible'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Game updated successfully',
            'data' => $game
        ]);
    }

    /**
     * Delete game (Admin only)
     */
    public function destroy($id)
    {
        $game = Game::find($id);

        if (!$game) {
            return response()->json([
                'success' => false,
                'message' => 'Game not found'
            ], 404);
        }

        $game->delete();

        return response()->json([
            'success' => true,
            'message' => 'Game deleted successfully'
        ]);
    }
}
