<?php

namespace App\Http\Controllers;

use App\Models\Paie;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Absence;
use App\Models\Departement;
use App\Models\DemandeConge;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Show the application dashboard for the admin.
     */
    public function admin()
    {

        // get the total of absences this month
        $totalAbsences = Absence::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        // get all the departments with the count of employees in each department
        $departements = Departement::withCount('users')->get();

        // get for each absence type the total number of absences
        $absenceTypes = Absence::select('type', DB::raw('count(*) as total'))
            ->groupBy('type')
            ->get()
            ->map(function ($absence) {
                return [
                    'type' => $absence->type,
                    'total' => $absence->total,
                ];
            });

        $employees = User::with('departement')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'totalEmployes' => User::count(),
            'demandeConges' => DemandeConge::count(),
            'totalAbsence' => $totalAbsences,
            'departementCount' => Departement::count(),
            'departmentWithEmployees' => $departements,
            'absenceTypes' => $absenceTypes,
            'employees' => $employees,
            'totalCDD' => User::where('type_contrat', 'CDD')->count(),
            'totalCDI' => User::where('type_contrat', 'CDI')->count(),
        ]);
    }


    public function employe()
    {
        $employees = User::with('departement')
            ->where('id', '!=', auth()->user()->id)
            ->where('status', 'actif')
            ->take(5)
            ->get()
            ->map(function ($employee) {
                return [
                    'id' => $employee->id,
                    'nom' => $employee->nom,
                    'prenom' => $employee->prenom,
                    'poste' => $employee->poste,
                    'email' => $employee->email,
                    'departement' => $employee->departement->nom,
                ];
            });
        $absences = Absence::where('employe_id', auth()->user()->id)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        // get the paie for the last 7 months
        $paies = Paie::where('employe_id', auth()->user()->id)->get();

        return Inertia::render('Employe/Dashboard', [
            'employees' => $employees,
            'totalEmployes' => User::count(),
            'demandeConges' => DemandeConge::where('employe_id', auth()->user()->id)->count(),
            'joursConge' => auth()->user()->joures_conges_restant,
            'joursAbsence' => $absences,
            'paisParMois' => $paies,
            'absences' => Absence::where('employe_id', auth()->user()->id)->get(),
        ]);
    }
}
