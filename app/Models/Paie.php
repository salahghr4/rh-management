<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paie extends Model
{
    use HasFactory;

    protected $fillable = [
        'montant',
        "date",
        "primes",
        'employe_id',
    ];

    public function employe()
    {
        return $this->belongsTo(User::class, 'employe_id');
    }
}
