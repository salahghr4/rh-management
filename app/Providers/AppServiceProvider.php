<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
      Validator::replacer('after_or_equal', function ($message, $attribute, $rule, $parameters) {
        $date = $parameters[0] === 'today' ? 'aujourd\'hui' : $parameters[0];
        return str_replace(':date', $date, $message);
    });

    }
}
