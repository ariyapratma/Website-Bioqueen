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
        Schema::create('header_home', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable(); // Update to nullable
            $table->string('image_url')->nullable(); // Update to nullable
            $table->string('whatsapp_link')->nullable(); // Update to nullable
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('header_home');
    }
};
