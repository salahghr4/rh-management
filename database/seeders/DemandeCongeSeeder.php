<?php

namespace Database\Seeders;

use App\Models\DemandeConge;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemandeCongeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DemandeConge::factory()
            ->count(20)
            ->create();
    }
}
