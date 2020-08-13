<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => "test",
            'email' => "test@test.com",
            'password' => Hash::make('12345678'),
            'email_verified_at' => now(),
        ]);
    }
}
