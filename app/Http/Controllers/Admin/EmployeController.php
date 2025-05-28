<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Document;
use App\Models\Departement;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeRequest;
use App\Http\Requests\UpdateEmployeRequest;
use Illuminate\Support\Facades\Storage;

class EmployeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return inertia('Admin/Employes/Index', [
            'employes' => User::with('departement')->latest()->get()
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

        $user = User::create($validated);

        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {

                $path = $file->store('documents/employe-'. $user->id, 'public');

                Document::create([
                    'employe_id' => $user->id,
                    'file_path' => $path,
                    'file_name' => $file->getClientOriginalName(),
                    'file_size' => $file->getSize(),
                    'file_extension' => $file->getClientOriginalExtension(),
                ]);
            }
        }
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
            'employe' => $employe,
            "documents" => $employe->documents->map(function ($document) {
                return [
                    'id' => $document->id,
                    'file_name' => $document->file_name,
                    'file_size' => $document->file_size,
                    'file_extension' => $document->file_extension,
                    'file_path' => Storage::url($document->file_path),
                ];
            }),
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
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeRequest $request, User $employe)
    {
        dd($request);
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

    /**
     * Download the specified document.
     */
    public function downloadDocument(User $employe, Document $document)
    {
        // Check if the document belongs to the employe
        if ($document->employe_id !== $employe->id) {
            return redirect()->back()->with('error', 'Document non trouvé pour cet employé.');
        }

        $fileName = $document->file_name;

        // Return the file as a download response
        return response()->download(public_path('storage/' . $document->file_path), $document->file_name);
    }
}
