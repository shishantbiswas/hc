<x-layout>
    <h1 class="text-3xl font-semibold">Forgot Password</h1>
    <div>

    @if(session("status"))
        <x-flash-message message="{{ session("status") }}" />
    @endif
        <form action="{{route('password.request')}}" method="post" class="flex flex-col">
            @csrf
            <label for="email">Email</label>
            <input type="text" name="email" value="{{old("email")}}">
            @error('email')
            <p class="text-red-700">
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
