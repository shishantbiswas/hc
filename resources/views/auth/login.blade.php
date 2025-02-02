<x-layout>
    <h1 class="text-3xl font-semibold">Login</h1>

    @if(session("status"))
        <x-flash-message message="{{ session("status") }}" />
    @endif
    <div>
        <form action="{{ route('login') }}" method="post" class="flex flex-col">
            @csrf
            <label for="email">Email</label>
            <input type="text" name="email" value="{{old(" email")}}">
            @error('email')
            <p class="text-red-700">
                {{ $message }}
            </p>
            @enderror


            <label for="password">Password</label>
            <input type="password" name="password">
            @error('password')
            <p class="text-red-700">
                {{ $message }}
            </p>
            @enderror

            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <input type="checkbox" name="remember" class="size-4" id="remember">
                    <label for="remember">Remember Me</label>

                </div>
                <a href="{{ route('password.request') }}" class="text-blue-600">
                    Forgot your password ?
                </a>

            </div>
            @error('failed')
            <p class="text-red-700">
                {{ $message }}
            </p>
            @enderror
            <button type="submit" class="btn mt-6">Submit</button>
        </form>
    </div>
</x-layout>