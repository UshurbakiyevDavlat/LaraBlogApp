<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['title' => 'post.create']);
        Permission::create(['title' => 'post.update']);
        Permission::create(['title' => 'post.delete']);
    }
}
