<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeConge extends Model
{
    use HasFactory;

    protected $fillable = [
        'date_debut',
        'date_fin',
        'statut',
        'type',
        'commentaire',
        'employe_id',
    ];
    
    public function employe()
    {
        return $this->belongsTo(User::class, 'employe_id');
    }

}
