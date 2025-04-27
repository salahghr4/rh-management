<?php

namespace App\Http\Controllers\Admin;

use App\Models\DemandeConge;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CongesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Admin/Conges/Index', [
            // 'conges' => DemandeConge::with('users')->get()
            'conges' => DemandeConge::with('employe:id,id,nom,prenom')->latest()->get()
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
    public function update(Request $request, string $id)
    {
        $request->validate([
            'statut' => 'required|string',
            'commentaire_rh' => 'nullable|string',
        ]);
        $conge = DemandeConge::findOrFail($id);
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
