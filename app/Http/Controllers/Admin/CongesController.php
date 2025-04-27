<?php

namespace App\Http\Controllers\Admin;

use App\Models\DemandeConge;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;

class CongesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Admin/Conges/Index', [
            // 'conges' => DemandeConge::with('users')->get()
            'conges' => DemandeConge::with('employe:id,id,nom,prenom,joures_conges_restant')->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DemandeConge $conge)
    {
        $request->validate([
            'statut' => ['required', 'string', Rule::in(['accepté', 'refusé', 'en attente'])],
            'commentaire_rh' => 'nullable|string',
        ]);
        $conge->statut = $request->statut;
        $conge->commentaire_rh = $request->commentaire_rh;
        $conge->save();

        return redirect()->back()->with('success', 'Congé mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
