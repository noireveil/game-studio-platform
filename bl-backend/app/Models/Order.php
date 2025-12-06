<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'total_price', 'status'];

    // Order milik satu User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Order punya banyak detail barang (OrderItem) 
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}