<?php

namespace App\Http\Controllers;

use App\Mail\LinkMail;
use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;

class LinkController extends Controller
{
    public function index()
    {
        // Mail::to("shishantbiswas@gmail.com")->send(new LinkMail());

        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $links = Auth::user()->links()
            ->orderBy('status', "asc")
            ->latest()
            ->paginate(12);
        return view("list", ["links" => $links]);
    }

    // public function create(Request $request) {}

    public function store(Request $request)
    {
        $values = $request->validate([
            'name' => ["required"],
            'url' => [
                "required",
                "url",
                function ($attribute, $value, $fail) {
                    $parsedUrl = parse_url($value);
                    $localhostVariants = ['localhost', '127.0.0.1', '::1'];

                    if (in_array($parsedUrl['host'], $localhostVariants)) {
                        $fail("The $attribute cannot be a localhost URL.");
                    }
                }

            ],
        ]);
        Auth::user()->links()->create($values);

        return back()->with("success", "link added successfully");
    }

    // public function edit() {}

    public function update(Request $request, Link $link)
    {

        // dd($link);
        $link->update([
            "status" => 1
        ]);

        return redirect("links")->with("update", "link updated successfully");
    }

    // public function show() {}

    public function destroy(Link $link)
    {
        // Gate::authorize("modify", $link);

        $link->delete();
        return back()->with("delete", "link was removed");
    }
}
