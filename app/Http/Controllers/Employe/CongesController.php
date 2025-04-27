<?php

namespace App\Http\Controllers\Employe;

use App\Models\DemandeConge;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;

class CongesController extends Controller
{
    public function index()
    {
        return inertia('Employe/Conges/Index', [
            'conges' => DemandeConge::with('employe:id,id,nom,prenom,joures_conges_restant')->where('employe_id', auth()->user()->id)->latest()->get()
        ]);
    }
    public function create()
    {
        return inertia('Employe/Conges/Create',[
            "types" => DemandeConge::distinct()->pluck('type'),
        ]);
    }
    public function store(Request $request)
    {
       $validated = $request->validate([
            'date_debut' => 'required|date|after_or_equal:date',
            'date_fin' => 'required|date|after:date_debut',
            'type' => ['required', Rule::in(['autre', 'maladie', 'congé'])],
            'commentaire' => 'nullable|string',
        ]);
        $validated['employe_id'] = auth()->user()->id;

        DemandeConge::create($validated);

        return redirect()->route('employe.conges.index')->with('success', 'Demande de congé envoyée avec succès');
    }

    public function destroy(DemandeConge $conge)
    {
        $conge->delete();
        return redirect()->route('employe.conges.index')->with('success', 'Demande de congé supprimée avec succès');
    }
}
