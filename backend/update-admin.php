<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$user = User::where('email', 'admin@gamestore.com')->first();
if ($user) {
    $user->password_hash = Hash::make('admin123');
    $user->save();
    echo "Admin password updated to 'admin123'\n";
} else {
    echo "Admin user not found\n";
}
