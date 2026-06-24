<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $fillable = [
        'user_id',
        'game_id',
        'price_at_purchase',
    ];

    protected $casts = [
        'price_at_purchase' => 'float',
    ];

    /**
     * Get the user who made the purchase
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the purchased game
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
