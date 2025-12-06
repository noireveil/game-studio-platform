<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = ['username', 'email', 'password_hash'];

    // Override karena nama kolom password beda 
    public function getAuthPassword()
    {
        return $this->password_hash;
    }

    // Relasi ke Roles (Admin/User)
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    // Helper untuk cek apakah user adalah admin (berguna untuk Middleware nanti)
    public function isAdmin()
    {
        return $this->roles()->where('name', 'admin')->exists();
    }
}