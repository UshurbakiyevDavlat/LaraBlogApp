<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('/posts', PostController::class);
    Route::prefix('categories')->group(static function () {
        Route::get('/', [CategoryController::class, 'index'])->name('categories.index');
    });
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('abilities', function (Request $request) {
        return $request->user()
            ->roles()
            ->with('permissions')
            ->get()
            ->pluck('permissions')
            ->flatten()
            ->pluck('title')
            ->values()
            ->toArray();
    });
});
