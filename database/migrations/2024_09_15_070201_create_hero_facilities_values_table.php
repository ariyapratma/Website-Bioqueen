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
        Schema::create('hero_facilities_value', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('heading1');
            $table->text('content1');
            $table->string('image_url1')->nullable();
            $table->string('heading2');
            $table->text('content2');
            $table->string('image_url2')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_facilities_value');
    }
};
