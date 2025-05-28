<?php

namespace App\Http\Controllers\Admin;

use App\Models\DemandeConge;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
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
        // Mettre à jour les jours de congé restants de l'employé
        $dateFin = Carbon::parse($conge->date_fin);
        $dateDebut = Carbon::parse($conge->date_debut);
        $duree = $dateFin->diffInDays($dateDebut, true) + 1;
        if ($conge->statut === 'accepté') {
            $conge->employe->joures_conges_restant -= $duree;
        }

        $conge->employe->save();

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
