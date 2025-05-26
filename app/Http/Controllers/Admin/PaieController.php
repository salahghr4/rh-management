<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaieRequest;
use App\Models\Paie;
use App\Models\User;
use Illuminate\Http\Request;

class PaieController extends Controller
{
  public function index()
  {
    $paies = Paie::with('employe:id,nom,prenom')->latest()->get();
    return inertia('Admin/Paie/Index', [
      'paies' => $paies,
    ]);
  }

  public function create()
  {
    $employes = User::where('status', 'actif')->get();
    return inertia('Admin/Paie/Create', [
      'employes' => $employes,
    ]);
  }

  public function store(StorePaieRequest $request)
  {
    $validated = $request->validated();

    foreach ($validated['paies'] as $paieData) {
      Paie::create($paieData);
    }

    return redirect()->route('admin.paies.index')->with('success', 'Paie créée avec succès.');
  }
}
