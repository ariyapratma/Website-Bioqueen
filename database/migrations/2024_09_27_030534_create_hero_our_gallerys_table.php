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
        Schema::create('hero_our_gallery', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('subtitle');
            $table->string('image_url1')->nullable();
            $table->string('title_image_url1');
            $table->string('image_url2')->nullable();
            $table->string('title_image_url2');
            $table->string('image_url3')->nullable();
            $table->string('title_image_url3');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_our_gallery');
    }
};
