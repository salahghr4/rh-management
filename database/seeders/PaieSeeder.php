<?php

namespace Database\Seeders;

use App\Models\Paie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Paie::factory()
            ->count(50)
            ->create();
    }
}
