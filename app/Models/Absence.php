<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;

    protected $fillable = [
        'employe_id',
        'date_absence',
        "type",
        "commentaire_justificatif",
        "statut",
        "justificatif",
        "fichier_justificatif_name",
        "fichier_justificatif_path",
        "fichier_justificatif_mime",
        "fichier_justificatif_size",
    ];

    public function employe()
    {
        return $this->belongsTo(User::class, 'employe_id');
    }

}
