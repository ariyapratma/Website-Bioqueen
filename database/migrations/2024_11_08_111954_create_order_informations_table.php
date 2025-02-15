<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('order_informations')) {
            Schema::create('order_informations', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('order_id');
                $table->string('recipient_name', 255)->nullable(false);
                $table->string('email', 255)->nullable(false);
                $table->unsignedBigInteger('payment_method_id')->nullable(false);
                $table->unsignedBigInteger('shipping_method_id')->nullable(false);
                $table->text('notes')->nullable();
                $table->text('address')->nullable(false);
                $table->unsignedInteger('postal_code')->nullable(false);
                $table->timestamps();

                // Foreign keys
                $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
                $table->foreign('payment_method_id')->references('id')->on('payment_methods')->onDelete('cascade');
                $table->foreign('shipping_method_id')->references('id')->on('shipping_methods')->onDelete('cascade');
            });
        } else {
            Schema::table('order_informations', function (Blueprint $table) {
                if (!Schema::hasColumn('order_informations', 'payment_method_id')) {
                    $table->unsignedBigInteger('payment_method_id')->nullable(false)->after('email');
                    $table->foreign('payment_method_id')->references('id')->on('payment_methods')->onDelete('cascade');
                }

                if (!Schema::hasColumn('order_informations', 'shipping_method_id')) {
                    $table->unsignedBigInteger('shipping_method_id')->nullable(false)->after('payment_method_id');
                    $table->foreign('shipping_method_id')->references('id')->on('shipping_methods')->onDelete('cascade');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_informations');
    }
};
