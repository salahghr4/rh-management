<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Absence>
 */
class Paie extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = $this->faker->dateTimeBetween('-5 months', 'now');
        return [
            'montant' => $this->faker->randomFloat(2, 4000, 30000),
            'date' => $date,
            'primes' => $this->faker->numberBetween(100, 1000),
            'employe_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'created_at' => $date,
            'updated_at' => now(),
        ];
    }
}
