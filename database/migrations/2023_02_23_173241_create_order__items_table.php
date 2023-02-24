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
        Schema::create('order__items', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity');
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('album_id')->constrained()->cascadeOnDelete();
            $table->double('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order__items');
    }
};
