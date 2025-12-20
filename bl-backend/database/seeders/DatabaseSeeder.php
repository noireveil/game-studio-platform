<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Game;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'username' => 'Admin',
            'email' => 'admin@gamestore.com',
            'password_hash' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Create test user
        User::create([
            'username' => 'TestUser',
            'email' => 'user@test.com',
            'password_hash' => Hash::make('user123'),
            'role' => 'user',
        ]);

        // Create sample games
        $games = [
            [
                'title' => 'Cyberpunk 2077',
                'description' => 'An open-world, action-adventure RPG set in the megalopolis of Night City.',
                'price' => 59.99,
                'image' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
                'category' => 'RPG',
                'rating' => 4.5,
                'features' => ['Single-player', 'Open World', 'Controller Support'],
                'is_visible' => true,
            ],
            [
                'title' => 'Elden Ring',
                'description' => 'A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R. R. Martin.',
                'price' => 59.99,
                'image' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
                'category' => 'Action',
                'rating' => 4.8,
                'features' => ['Single-player', 'Online Co-op', 'Open World'],
                'is_visible' => true,
            ],
            [
                'title' => 'Red Dead Redemption 2',
                'description' => 'Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores.',
                'price' => 39.99,
                'image' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
                'category' => 'Adventure',
                'rating' => 4.9,
                'features' => ['Single-player', 'Online Multi-Player', 'Open World'],
                'is_visible' => true,
            ],
            [
                'title' => 'Grand Theft Auto V',
                'description' => 'Experience Rockstar Games most visually stunning game world yet.',
                'price' => 29.99,
                'image' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
                'category' => 'Action',
                'rating' => 4.7,
                'features' => ['Single-player', 'Online Multi-Player', 'Open World'],
                'is_visible' => true,
            ],
            [
                'title' => 'The Witcher 3: Wild Hunt',
                'description' => 'The most awarded game of a generation now enhanced for the next!',
                'price' => 39.99,
                'image' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg',
                'category' => 'RPG',
                'rating' => 4.9,
                'features' => ['Single-player', 'Open World', 'Controller Support'],
                'is_visible' => true,
            ],
            [
                'title' => 'Hidden Gem (Not Visible)',
                'description' => 'This game is hidden from public view.',
                'price' => 19.99,
                'image' => 'https://via.placeholder.com/460x215',
                'category' => 'Indie',
                'rating' => 3.5,
                'features' => ['Single-player'],
                'is_visible' => false,
            ],
        ];

        foreach ($games as $game) {
            Game::create($game);
        }
    }
}
