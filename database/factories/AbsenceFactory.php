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
            'type' => $this->faker->randomElement(['maladie', 'congé', 'non justifiés']),
            'employe_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'justificatif' => $justificatif,
            'commentaire_justificatif' => $this->faker->text(200),
            'fichier_justificatif_name' => $justificatif == 'oui' ? $this->faker->word() . '.pdf' : null,
            'fichier_justificatif_path' => $justificatif == 'oui' ? $this->faker->word() . '.pdf' : null,
            'fichier_justificatif_mime' => $justificatif == 'oui' ? 'application/pdf' : null,
            'fichier_justificatif_size' => $justificatif == 'oui' ? $this->faker->numberBetween(1000, 10000) : null,
            'created_at' => $date,
            'updated_at' => now(),
        ];
    }
}
