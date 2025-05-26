<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Absence;
use App\Models\User;
use Illuminate\Http\Request;

class AbsenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Admin/Absences/Index', [
            'absences' => Absence::with('employe:id,nom,prenom')->orderBy('date_absence', 'desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Absences/Create', [
            'employes' => User::select('id', 'nom', 'prenom')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
            'employe_id' => 'required|exists:users,id',
            'date_absence' => 'required|date',
            'type' => 'required|in:maladie,congé,personnel',
            'justificatif' => 'required|in:oui,non',
        ]);

        Absence::create($validated);

        return redirect()->route('admin.absences.index')->with('success', 'Absence créée avec succès.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Absence $absence)
    {
        return inertia('Admin/Absences/Edit', [
            'absence' => $absence,
            'employes' => User::select('id', 'nom', 'prenom')->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Absence $absence)
    {
        $validated = $request->validate([
            'employe_id' => 'required|exists:users,id',
            'date_absence' => 'required|date',
            'type' => 'required|in:maladie,congé,personnel',
            'justificatif' => 'required|in:oui,non',
        ]);

        $absence->update($validated);

        return redirect()->route('admin.absences.index')->with('success', 'Absence mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Absence $absence)
    {
        $absence->delete();

        return redirect()->route('admin.absences.index')->with('success', 'Absence supprimée avec succès.');
    }
}
