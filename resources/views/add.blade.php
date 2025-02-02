<x-layout>
    <h1>Add</h1>

    @if (session('success'))
        <x-flash-message color="bg-green-600" message="{{ session('success') }}"/>
    @endif

    <form action="{{ route('links.store') }}" method="post" class="flex flex-col">
        @csrf
        <label for="name">Name</label>
        <input type="text" name="name">
        @error('name')
            <p class="text-red-600">
                {{ $message }}
            </p>
        @enderror
        <label for="url">URL</label>
        <input type="text" name="url">
        @error('url')
            <p class="text-red-600">
                {{ $message }}
            </p>
        @enderror
        <button type="submit" class="btn mt-4">Submit</button>
    </form>
</x-layout>
