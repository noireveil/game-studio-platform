<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'game_id',
        'user_id',
        'rating',
        'content',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    /**
     * Get the user who wrote the review
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the game being reviewed
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
