<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::factory()->create();
        $admin->roles()->attach(Role::where('title', 'Admin')->value('id'));

        $editor = User::factory()->create();
        $editor->roles()->attach(Role::where('title', 'Editor')->value('id'));
    }
}
