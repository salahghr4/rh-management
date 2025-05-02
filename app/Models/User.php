<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'adresse',
        'telephone',
        'date_embauche',
        'poste',
        'type_contrat',
        'status',
        'salaire',
        'role',
        'departement_id',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_embauche' => 'date:Y-m-d',
            'salaire' => 'decimal:2',
        ];
    }

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isRh()
    {
        return $this->role === 'rh';
    }

    public function paies()
    {
        return $this->hasMany(Paie::class, 'employe_id');
    }
}
