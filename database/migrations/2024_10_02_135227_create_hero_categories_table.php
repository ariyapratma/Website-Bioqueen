<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hero_categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique(); // Tambahkan unique untuk memastikan slug tidak duplikat
            $table->string('image_url', 500); // Panjangkan image_url jika diperlukan
            $table->string('name');
            $table->text('description_categories');
            $table->timestamps();

            $table->index('slug'); // Tambahkan index untuk mempercepat pencarian berdasarkan slug
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_categories');
    }
};
