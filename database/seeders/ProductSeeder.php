<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'category_id' => 1, // Sesuaikan dengan ID kategori yang ada
            'name' => 'Sample Product',
            'description' => 'This is a sample product.',
            'image_url' => 'path_to_image',
            'price' => 10000,
        ]);
    }
}
