<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Test endpoint
Route::get('/hello', function () {
    return response()->json([
        'success' => true,
        'message' => 'API is working!'
    ]);
});

// ==================== AUTH ROUTES ====================
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// ==================== PUBLIC ROUTES ====================
// Games (public access)
Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{id}', [GameController::class, 'show']);

// Reviews (public read access)
Route::get('/games/{gameId}/reviews', [ReviewController::class, 'index']);

// ==================== PROTECTED ROUTES (Require Login) ====================
Route::middleware('auth:sanctum')->group(function () {
    
    // ========== REVIEWS ==========
    Route::post('/games/{gameId}/reviews', [ReviewController::class, 'store']);
    Route::delete('/games/{gameId}/reviews/{reviewId}', [ReviewController::class, 'destroy']);

    // ========== PURCHASES ==========
    Route::get('/purchases', [PurchaseController::class, 'index']);
    Route::post('/purchases', [PurchaseController::class, 'store']);
    Route::post('/purchases/checkout', [PurchaseController::class, 'checkout']);
    Route::get('/purchases/check/{gameId}', [PurchaseController::class, 'checkOwnership']);

    // ========== ADMIN ROUTES ==========
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        
        // Users management
        Route::get('/users', [AdminController::class, 'users']);
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
        Route::put('/users/{id}/role', [AdminController::class, 'updateRole']);
        
        // Reviews management
        Route::get('/reviews', [ReviewController::class, 'all']);
        Route::delete('/reviews/{id}', [ReviewController::class, 'adminDestroy']);
        
        // Games management
        Route::get('/games', [GameController::class, 'index']);
        Route::post('/games', [GameController::class, 'store']);
        Route::put('/games/{id}', [GameController::class, 'update']);
        Route::delete('/games/{id}', [GameController::class, 'destroy']);
    });
});
