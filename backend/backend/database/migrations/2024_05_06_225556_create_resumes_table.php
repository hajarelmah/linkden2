<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('filepath');
            // Add any other columns you need
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('resumes');
    }
};