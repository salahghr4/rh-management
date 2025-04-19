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
        Schema::create('demande_conges', function (Blueprint $table) {
            $table->id();
            $table->date('date_debut');
            $table->date('date_fin');
            $table->enum('statut', ['accepté', 'refusé', 'en attente'])->default('en attente');
            $table->enum('type', ['congé', 'maladie', 'autre'])->default('congé');
            $table->text('commentaire')->nullable();
            $table->foreignId('employe_id')->constrained('users')->onDelete('cascade');
            $table->text('commentaire_rh')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demande_conges');
    }
};
