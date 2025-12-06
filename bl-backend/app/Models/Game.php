<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    // Agar kolom ini bisa diisi data (Mass Assignment)
    protected $fillable = [
        'title', 'description', 'developer', 'platform', 'price', 'release_date'
    ];

    // --- RELASI (Menghubungkan tabel Games dengan tabel lain) ---

    // Game punya banyak Gambar (GameImage)
    public function images()
    {
        return $this->hasMany(GameImage::class);
    }

    // Game punya banyak Video (GameVideo)
    public function videos()
    {
        return $this->hasMany(GameVideo::class);
    }

    // Game punya banyak Komentar 
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Cara pakainya nanti: Game::newReleases()->get();
    public function scopeNewReleases($query)
    {
        return $query->orderBy('release_date', 'desc')->take(5);
    }
}