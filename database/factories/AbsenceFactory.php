<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Absence>
 */
class AbsenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = $this->faker->dateTimeBetween('-2 months', 'now');
        $justificatif = $this->faker->randomElement(['oui', 'non']);
        return [
            'date_absence' => $date,
            'type' => $this->faker->randomElement(['maladie', 'congé', 'personnel']),
            'employe_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'justificatif' => $justificatif,
            'created_at' => $date,
            'updated_at' => now(),
        ];
    }
}
