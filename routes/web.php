<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LinkController;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Password;
 


Route::resource("links", LinkController::class)->middleware('verified');

//! PROTECTED ROUTES
Route::middleware("auth")->group(function () {
    Route::view('/add', 'add')->name("add");
    // Route::view('/list', 'list')->name("list");
    Route::post('/logout', [AuthController::class, "logout"])->name("logout");

    Route::get('/email/verify',[AuthController::class,'verifyNotice'])->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}',[AuthController::class,'verifyEmail'])
    ->middleware('signed')
    ->name('verification.verify');

    Route::post('/email/verification-notification', [AuthController::class,"verifyHandler"])->middleware('throttle:6,1')->name('verification.send');
    
});

//? PUBLIC ROUTES
Route::middleware("guest")->group(function () {
    Route::view("/register", 'auth.register')->name("register");
    Route::post('/register', [AuthController::class, "register"]);
    Route::view("/login", 'auth.login')->name("login");
    Route::post('/login', [AuthController::class, "login"]);
    
    
    Route::view('/', 'index')->name("index");
    Route::view('/forgot-password', 'auth.forgot-password')->name('password.request');
    Route::post('/forgot-password', [ResetPasswordController::class,"passwordEmail"])->name('password.email');
    Route::get('/reset-password/{token}', [ResetPasswordController::class,"passwordReset"])->name('password.reset');
    
    Route::post('/reset-password', [ResetPasswordController::class,"passwordUpdate"])->name('password.update');
    
    
});
