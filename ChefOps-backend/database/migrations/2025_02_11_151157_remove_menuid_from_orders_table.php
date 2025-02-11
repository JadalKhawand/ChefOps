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
        Schema::table('orders', function (Blueprint $table) {
        $table->dropForeign('orders_menuid_foreign');
        
        $table->dropColumn('menuID');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
        $table->integer('menuID')->nullable();

        $table->foreign('menuID')->references('menuID')->on('menus')->onDelete('cascade');
        });
    }
};
