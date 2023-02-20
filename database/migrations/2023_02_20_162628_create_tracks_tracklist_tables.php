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

      

        Schema::create('tracklists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('album_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tracklist_id')->constrained()->onDelete('cascade');
            $table->integer('track_number');
            $table->string('title');
            $table->string('duration');
            $table->timestamps();
        });
        Schema::table('albums', function (Blueprint $table) {
            $table->string('genre')->nullable();
            $table->integer('discogs_album_id')->nullable();
            $table->string('year_of_release')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tracks');
        Schema::dropIfExists('tracklists');
    }
};
