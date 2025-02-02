<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ env("APP_NAME")}}</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="flex flex-col items-center">
    <main class="max-w-2xl  w-full">
        <nav class="p-2 flex  bg-black/10 rounded mt-4 items-center justify-between">
            <div>
                <a href="{{ route("index") }}">
                    <img class="size-6 p-0.5" src="/favicon.ico" alt="icon">
                </a>
            </div>
            <div class="flex text-sm items-center gap-3">
                @auth
                    <a href="{{ route('links.index') }}">List</a>
                    <a href="{{ route('add') }}">Add</a>
                    <form action="{{ route('logout') }}" method="post">
                        @csrf
                        <button>Logout</button>
                    </form>
                @endauth
                @guest
                    <a href="{{ route('register') }}">Register</a>
                    <a href="{{ route('login') }}">Login</a>
                @endguest
            </div>
        </nav>
        <section class="mt-4">
            {{ $slot }}
        </section>
    </main>
</body>

</html>
