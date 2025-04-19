<?php

namespace Database\Factories;

use App\Models\Departement;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => fake()->lastName(),
            'prenom' => fake()->firstName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'adresse' => fake()->address(),
            'telephone' => "06" . fake()->randomNumber(8, true), // telephone aléatoire,
            'date_embauche' => fake()->dateTimeBetween('-8 years', 'now')->format('Y-m-d'),
            'poste' => fake()->jobTitle(),
            'type_contrat' => fake()->randomElement(['CDI', 'CDD']),
            'status' => 'active',
            'salaire' => fake()->randomFloat(2, 4000, 30000), // Salaire entre 4000 et 40,000
            'role' => fake()->randomElement(['admin', 'employee', 'rh', 'manager']),
            'departement_id' => Departement::inRandomOrder()->first()->id ?? Departement::factory(),
            'password' => Hash::make('password123'), // mot de passe sécurisé
            'joures_conges_restant' => 18,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
