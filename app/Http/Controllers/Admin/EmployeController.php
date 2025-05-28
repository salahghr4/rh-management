<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Document;
use App\Models\Departement;
use Illuminate\Support\Str;
use App\Mail\WelcomeEmployeeMail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\StoreEmployeRequest;
use App\Http\Requests\UpdateEmployeRequest;

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
        $plainPassword = $validated['password'] ?? Str::random(10);
        $validated['password'] = bcrypt($plainPassword);
        $user = User::create($validated);
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $index => $file) {
                $path = $file->store('documents', 'public');

                Document::create([
                    'employe_id' => $user->id,
                    'file_path' => $path,
                    'filename' => $file->getClientOriginalName(),
                ]);
            }
        }
        Mail::to($user->email)->send(new WelcomeEmployeeMail($user, $plainPassword));
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
            'departements' => Departement::all(),
            'documents' => $employe->documents,
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
        
        if ($request->hasFile('documents')) {
            $employe->documents()->delete();
            // foreach ($request->file('documents') as $file) {
            //     $path = $file->store('documents', 'public');

            //     Document::create([
            //         'employe_id' => $employe->id,
            //         'file_path' => $path,
            //         'filename' => $file->getClientOriginalName(),
            //     ]);
            // }
        }


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
