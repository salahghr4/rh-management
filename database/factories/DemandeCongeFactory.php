<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DemandeConge>
 */
class DemandeCongeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Generate a random date between -2 months and +1 month from now
        $dateDebut = $this->faker->dateTimeInInterval('-2 months', '+1 month');
        // Generate a random date between the start date and +1 week
        $dateFin = $this->faker->dateTimeBetween($dateDebut, '+1 week');
        // Generate a random status from the given options
        $status = $this->faker->randomElement(['accepté', 'refusé', 'en attente']);

        return [
            'date_debut' => $dateDebut,
            'date_fin' => $dateFin,
            'statut' => $status,
            'type' => $this->faker->randomElement(['congé', 'maladie', 'autre']),
            'commentaire' => $this->faker->text(200),
            'employe_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'commentaire_rh' => $status === 'refusé' ? $this->faker->text(200) : null,
            'created_at' => $this->faker->dateTimeBetween('-2 months', 'now'),
            'updated_at' => now(),
        ];
    }
}
