<?php

namespace App\Http\Controllers;

use App\Mail\WelcomeMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $values = $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|confirmed|min:3",
        ]);

        $user = User::create($values);

        Auth::login($user);
        event(new Registered($user));
        Mail::to($request->email,$request->name)->send(new WelcomeMail());

        return redirect("/links");
    }

    public function verifyNotice(){
        return view('auth.verify-email');
    }

    public function verifyEmail(EmailVerificationRequest $request) {
        $request->fulfill();
     
        return redirect('/links');
    }

    function verifyHandler (Request $request) {
        $request->user()->sendEmailVerificationNotification();
     
        return back()->with('message', 'Verification link sent!');
    }

    public function login(Request $request)
    {
        $values = $request->validate([
            "email" => "required|email",
            "password" => "required|min:3",
        ]);

        if (Auth::attempt($values, $request->remember)) {
            return redirect()->intended();
        } else {
            return back()->withErrors([
                "failed"=>"Incorrect Credentials !"
            ]);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect("/");
    }
}
