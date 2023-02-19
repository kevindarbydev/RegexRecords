<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

     // Try running this one, it might give an error but check the db anyway
     //if it didnt add the columns, try the one below, not sure which one worked for me
    public function up()
    {
        Schema::table('collections', function (Blueprint $table) {
            $table->integer('user_id')->after('id');
            $table->string('collection_name')->after('user_id');

            $table->foreign('user_id')
            ->references('id')
            ->on('users')
            ->onDelete('cascade');
        });
    }


    // public function up()
    // {
    //     Schema::table('collections', function (Blueprint $table) {
    //         $table->foreignId('user_id')->constrained()->cascadeOnDelete()->after('id');
    //         $table->string('collection_name')->after('user_id');
    //     });
    // }









    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('collections', function (Blueprint $table) {
            $table->dropColumn('collection_name');
        });
    }
};
