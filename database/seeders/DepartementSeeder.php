<?php

namespace Database\Seeders;

use App\Models\Departement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();
        Departement::insert([
            ['nom' => 'HR', 'created_at' => $now, 'updated_at' => $now],
            ['nom' => 'IT', 'created_at' => $now, 'updated_at' => $now],
            ['nom' => 'Finance', 'created_at' => $now, 'updated_at' => $now],
            ['nom' => 'Marketing', 'created_at' => $now, 'updated_at' => $now],
            ['nom' => 'Sales', 'created_at' => $now, 'updated_at' => $now],
            ['nom' => 'Customer Support', 'created_at' => $now, 'updated_at' => $now],
            ['nom' => 'Operations', 'created_at' => $now, 'updated_at' => $now],
            ['nom' => 'Legal', 'created_at' => $now, 'updated_at' => $now],
            ['nom' => 'Research and Development', 'created_at' => $now, 'updated_at' => $now],
            ['nom' => 'Administration', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
