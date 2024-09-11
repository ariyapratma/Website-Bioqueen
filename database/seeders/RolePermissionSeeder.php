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
        $admin = \App\Models\User::find(1);
        if ($admin) {
            $admin->assignRole('admin');
        }

        $user = \App\Models\User::find(2);
        if ($user) {
            $user->assignRole('user');
        }
    }
}
