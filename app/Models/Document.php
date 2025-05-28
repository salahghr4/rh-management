<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;
    protected $fillable = ['employe_id', 'file_path','file_name', 'file_size', 'file_extension'];

    public function user()
    {
        return $this->belongsTo(User::class, 'employe_id');
    }

}
