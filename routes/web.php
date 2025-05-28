<?php

use App\Http\Controllers\Admin\AbsenceController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Employe\CongesController;
use App\Http\Controllers\Employe\EmployeController;
use App\Http\Controllers\Admin\DepartementController;
use App\Http\Controllers\Admin\CongesController as AdminCongesController;
use App\Http\Controllers\Admin\DocumentController;
use App\Http\Controllers\Admin\EmployeController as AdminEmployeController;
use App\Http\Controllers\Admin\PaieController as AdminPaieController;
use App\Http\Controllers\Employe\PaieController;

Route::get('/', function () {
  return Inertia::render('Welcome');
});

Route::prefix('admin')->middleware(['auth', 'checkRole:admin,rh'])->name('admin.')->group(function () {
  Route::get('/dashboard', [DashboardController::class, 'admin'])->name('dashboard');
  Route::resource('employes', AdminEmployeController::class)->names('employes');
  Route::put('/employes/{employe}/activer', [AdminEmployeController::class, 'activer'])->name('employes.activer');
  Route::resource('conges', AdminCongesController::class)->only(['index', 'update'])->names('conges');
  Route::resource('departements', DepartementController::class)->names('departements');
  Route::get('/paies', [AdminPaieController::class, 'index'])->name('paies.index');
  Route::get('/paies/create', [AdminPaieController::class, 'create'])->name('paies.create');
  Route::post('/paies', [AdminPaieController::class, 'store'])->name('paies.store');
  Route::resource('/absences', AbsenceController::class)->except('show')->names('absences');
  Route::get('/employes/{employe}/documents/{document}/download', [DocumentController::class, 'downloadDocument'])->name('employes.documents.download');
  Route::post('/employes/{employe}/documents', [DocumentController::class, 'store'])->name('employes.documents.store');
  Route::delete('/employes/{employe}/documents/{document}', [DocumentController::class, 'destroy'])->name('employes.documents.destroy');
});

Route::prefix('employe')->middleware(['auth', 'checkRole:employe,manager'])->name('employe.')->group(function () {
  Route::get('/dashboard', [DashboardController::class, 'employe'])->name('dashboard');
  Route::resource('employes', EmployeController::class)->only('index')->names('employes');
  Route::resource('conges', CongesController::class)->names('conges');
  Route::get('/paies', [PaieController::class, 'index'])->name('paies.index');
});

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
