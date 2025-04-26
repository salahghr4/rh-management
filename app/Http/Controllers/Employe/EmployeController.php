<?php

namespace App\Http\Controllers\Employe;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeRequest;
use App\Http\Requests\UpdateEmployeRequest;
use App\Models\Departement;

class EmployeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $employes = User::with('departement')
      ->where('status', 'actif')
      ->get()
      ->map(function ($employee) {
          return [
              'id' => $employee->id,
              'nom' => $employee->nom,
              'prenom' => $employee->prenom,
              'poste' => $employee->poste,
              'email' => $employee->email,
              'departement' => $employee->departement->nom,
              'poste' => $employee->poste,
          ];
      });
        return inertia('Employe/Employes/Index', [
            'employes' => $employes
        ]);
    }
}
