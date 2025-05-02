<?php

namespace App\Http\Controllers\Employe;

use App\Http\Controllers\Controller;
use App\Models\Paie;
use App\Models\User;

class PaieController extends Controller
{
  public function index()
  {
    return inertia('Employe/Paie/Index', [
      'paies' => auth()->user()->paies()->latest()->get(),
      'date_embauche' => auth()->user()->date_embauche,
    ]);
  }
}
