<?php

namespace App\Http\Controllers\Admin;

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
        //
        return inertia('Admin/Employes/Index', [
            'employes' => User::with('departement')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Employes/Create', [
            'departements' => Departement::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = bcrypt($validated['password']);
        User::create($validated);
        return redirect()->route('admin.employes.index')->with('success', 'Employé créé avec succès');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $employe)
    {
        // get the employe with the departement
        $employe = User::with('departement')->find($employe->id);
        return inertia('Admin/Employes/Show', [
            'employe' => $employe
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $employe)
    {
        $employe = User::with('departement')->find($employe->id);
        return inertia('Admin/Employes/Edit', [
            'employe' => $employe,
            'departements' => Departement::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeRequest $request, User $employe)
    {
        $validated = $request->validated();

        // Only hash the password if provided
        if (!empty($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        $employe->update($validated);

        return redirect()->route('admin.employes.show', $employe->id)->with('success', 'Employé mis à jour avec succès');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $employe)
    {
        $employe->status = "inactif";
        $employe->save();
        return redirect()->route('admin.employes.index')->with('success', 'Employé supprimé avec succès');
    }

    /**
     * Activer the specified resource in storage.
     */
    public function activer(User $employe)
    {
        $employe->status = "actif";
        $employe->save();
        return redirect()->route('admin.employes.index')->with('success', 'Employé supprimé avec succès');
    }
}
