<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Paie;

class PaieController extends Controller
{
  public function index()
  {
    $paies = Paie::with('employe:id,nom,prenom')->latest()->get();
    return inertia('Admin/Paie/Index', [
      'paies' => $paies,
    ]);
  }
}
