<x-layout>
    <h1 class="text-3xl font-semibold">Password Reset</h1>
    <div>

    @if(session("status"))
        <x-flash-message message="{{ session("status") }}" />
    @endif
        <form action="{{route('password.update')}}" method="post" class="flex flex-col">
            @csrf
            <input type="hidden" name="token" value={{$token}}>
            <label for="email">Email</label>
            <input type="text" name="email" value="{{old("email")}}">
            @error('email')
            <p class="text-red-700">
                {{ $message }}
            </p>
            @enderror
            <label for="password">Password</label>
            <input  type="password" name="password">
            @error('password')
            <p class="bg-red-600">
                {{ $message }}
            </p>
            @enderror
            <label for="password_confirmation">Confirm Password</label>
            <input  type="password" name="password_confirmation">
            @error('password')
            <p class="bg-red-600">
                {{ $message }}
            </p>
            @enderror

            @error('failed')
            <p class="text-red-700">
                {{ $message }}
            </p>
            @enderror
            <button type="submit" class="btn mt-6">Submit</button>
        </form>
    </div>
</x-layout>
