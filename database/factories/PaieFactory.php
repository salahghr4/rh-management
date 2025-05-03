<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Absence>
 */
class PaieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first() ?? User::factory();
        $date = $this->faker->dateTimeBetween('-5 months', 'now');
        return [
            'montant' => $user->salaire,
            'date' => $date,
            'prime' => $this->faker->randomFloat(2, 100, 1000),
            'employe_id' => $user->id,
            'created_at' => $date,
            'updated_at' => now(),
        ];
    }
}
