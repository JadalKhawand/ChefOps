<?php

use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/api/menus', [MenuController::class, 'index'])->name('menus.index');

Route::post('/api/menus', [MenuController::class, 'store'])->name('menus.store');

Route::get('/api/menus/{menu}', [MenuController::class, 'show'])->name('menus.show');

Route::put('/api/menus/{menu}', [MenuController::class, 'update'])->name('menus.update');

Route::apiResource('menus', MenuController::class);Route::apiResource('menus', MenuController::class);Route::delete('/api/menus/{menu}', [MenuController::class, 'destroy'])->name('menus.destroy');

Route::post('/api/login', [AuthController::class, 'login']);
Route::post('/api/register', [AuthController::class, 'register']);