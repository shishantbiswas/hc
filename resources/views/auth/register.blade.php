<x-layout>
    <h1 class="text-3xl font-semibold">Register</h1>
    <div>
        <form action="{{ route('register') }}" method="post" class="flex flex-col">
            @csrf
            <label for="name">Name</label>
            <input type="text" name="name" value="{{old("name")}}">
            @error('name')
            <p class="bg-red-600">
                {{ $message }}
            </p>
            @enderror
            <label for="email">Email</label>
            <input type="text" name="email" value="{{old("email")}}">
            @error('email')
            <p class="bg-red-600">
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
            <button type="submit" class="btn mt-6">Submit</button>
        </form>
    </div>
</x-layout>
