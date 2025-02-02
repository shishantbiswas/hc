<x-layout>
    <div>
        {{-- TODO!  --}}
        <h1> Home Page style this later</h1>
        @auth
        {{auth()->user()->id}}
        @endauth
    </div>
</x-layout>
