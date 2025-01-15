<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User; // Pastikan Anda mengimpor model User

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat permissions (jika belum ada)
        Permission::firstOrCreate(['name' => 'manage content']); // Untuk admin
        Permission::firstOrCreate(['name' => 'order product']); // Untuk user
        Permission::firstOrCreate(['name' => 'view pages']); // Untuk guest

        // Buat roles dan assign permissions (jika belum ada)
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo(['manage content', 'view pages']); // Admin bisa mengelola konten dan melihat semua halaman

        $userRole = Role::firstOrCreate(['name' => 'user']);
        $userRole->givePermissionTo(['order product', 'view pages']); // User bisa melakukan order dan melihat halaman

        $guestRole = Role::firstOrCreate(['name' => 'guest']);
        $guestRole->givePermissionTo('view pages'); // Guest hanya bisa melihat halaman

        // Assign roles ke user tertentu (sesuaikan dengan user ID atau logic lain)

        // Membuat user admin jika belum ada
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password123') // Pastikan password ini aman dan sesuai kebutuhan
            ]
        );
        $admin->assignRole('admin');

        // Membuat user biasa jika belum ada
        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Regular User',
                'password' => bcrypt('password123') // Pastikan password ini aman dan sesuai kebutuhan
            ]
        );
        $user->assignRole('user');
    }
}
