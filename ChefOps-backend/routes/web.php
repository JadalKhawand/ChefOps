<?php

use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WorkerController;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/api/workers', [WorkerController::class, 'index'])->name('workers.index');

Route::post('/api/workers', [WorkerController::class, 'store'])->name('workers.store');

Route::get('/api/workers/{worker}', [WorkerController::class, 'show'])->name('workers.show');

Route::put('/api/workers/{worker}', [WorkerController::class, 'update'])->name('workers.update');
Route::apiResource('workers', WorkerController::class);
Route::delete('/api/workers/{worker}', [WorkerController::class, 'destroy'])->name('workers.destroy');


Route::get('/api/menus', [MenuController::class, 'index'])->name('menus.index');

Route::post('/api/menus', [MenuController::class, 'store'])->name('menus.store');

Route::get('/api/menus/{menu}', [MenuController::class, 'show'])->name('menus.show');

Route::put('/api/menus/{menu}', [MenuController::class, 'update'])->name('menus.update');

Route::apiResource('menus', MenuController::class);Route::apiResource('menus', MenuController::class);Route::delete('/api/menus/{menu}', [MenuController::class, 'destroy'])->name('menus.destroy');

Route::post('/api/login', [AuthController::class, 'login']);
Route::post('/api/register', [AuthController::class, 'register']);