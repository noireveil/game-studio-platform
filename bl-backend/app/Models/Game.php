<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'title', 
        'description', 
        'price', 
        'image', 
        'category', 
        'rating', 
        'features',
        'is_visible',
    ];

    protected $casts = [
        'features' => 'array',
        'rating' => 'float',
        'price' => 'float',
        'is_visible' => 'boolean',
    ];

    /**
     * Get reviews for this game
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get purchases for this game
     */
    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }
}