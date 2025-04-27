<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Employe\CongesController;
use App\Http\Controllers\Employe\EmployeController;
use App\Http\Controllers\Admin\CongesController as AdminCongesController ;
use App\Http\Controllers\Admin\EmployeController as AdminEmployeController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::prefix('admin')->middleware(['auth', 'checkRole:admin,rh'])->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'admin'])->name('dashboard');
    Route::resource('employes', AdminEmployeController::class)->names('employes');
    Route::put('/employes/{employe}/activer', [AdminEmployeController::class, 'activer'])->name('employes.activer');
    Route::resource('conges', AdminCongesController::class)->names('conges');
});

Route::prefix('employe')->middleware(['auth', 'checkRole:employe,manager'])->name('employe.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'employe'])->name('dashboard');
    Route::resource('employes', EmployeController::class)->only('index')->names('employes');
    Route::resource('conges', CongesController::class)->names('conges');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
