@props(['message', 'color' => 'bg-blue-600'])

<div class="{{ $color }} text-white w-full font-semibold px-2 py-1 my-2 rounded">
    <p class="capitalize">{{ $message }}</p>
</div>
