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
        Schema::create('collection__albums', function (Blueprint $table) {
            $table->id();
            $table->foreignId('collections_id')->constrained()->cascadeOnDelete();
            $table->foreignId('albums_id')->constrained()->cascadeOnDelete();
            $table->timestamps('added_date');
            $table->boolean('for_sale');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collection__albums');
    }
};
