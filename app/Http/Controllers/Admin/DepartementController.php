<?php

namespace App\Http\Controllers\Admin;

use App\Models\Departement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DepartementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Admin/Departements/Index', [
            'departements' => Departement::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
        ]);
        Departement::create($validated);
        return redirect()->route('admin.departements.index')->with('success', 'Département créé avec succès');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
        ]);
        $departement = Departement::find($id);
        $departement->update($validated);
        return redirect()->route('admin.departements.index')->with('success', 'Département mis à jour avec succès');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $departement = Departement::find($id);
        $departement->delete();
        return redirect()->route('admin.departements.index')->with('success', 'Département supprimé avec succès');
    }
}
