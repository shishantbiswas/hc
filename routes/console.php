<?php

use App\Mail\LinkDownMail;
use App\Models\Link;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::call(function () {
    $active_links = Link::all()->where("status", "=", 1);
    Log::info("running task for " . $active_links->count() . " urls");

    foreach ($active_links as $link) {
        try {
            $response = Http::retry(3, 100)->get((string)$link->url);
            if ($response->status() !== 200) {
                $link->update(['status' => 0]);
                Log::info("not 200 status for: " . $link->url);
                Mail::to($link->user->email)->send(new LinkDownMail(
                    strval($link->url),
                    $link->user->name,
                    "A non 200 status code was returned"
                ));
            }
        } catch (\Exception $e) {
            $link->update(['status' => 0]);
            Log::info("req failed after 3 retries for: " . $link->url);
            Mail::to($link->user->email)->send(new LinkDownMail(
                strval($link->url),
                $link->user->name,
                $e->getMessage()
            ));
        }
    }

    return true;
})->everyTenMinutes();
