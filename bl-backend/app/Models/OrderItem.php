<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    // Tabel Anda mungkin bernama 'order_items' (jamak), pastikan sesuai
    protected $table = 'order_items'; 

    protected $fillable = ['order_id', 'game_id', 'price'];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}