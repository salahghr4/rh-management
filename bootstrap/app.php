<?php

use App\Http\Middleware\EnsureUserHasRole;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'checkRole' => EnsureUserHasRole::class
        ]);
        $middleware->redirectUsersTo(function (Request $request) {
            return $request->user()->isAdmin() || $request->user()->isRh() ? '/admin/dashboard' : '/employe/dashboard';
        });

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
