<x-layout>
    <h1>List</h1>

    {{-- NEW USER MESSAGE --}}
    <div class="flex gap-2 flex-col my-4">
        @if ($links->count() <= 0)
            <p>You don't have any links</p>
            <a href="{{ route('add') }}">Click here to add one.</a>
        @endif

        @if (session("update"))
        <x-flash-message color="bg-yellow-500" message="{{ session('update') }}"/>
        @elseif(session("delete"))
        <x-flash-message color="bg-red-500" message="{{ session('delete') }}"/>
        @endif


        @foreach ($links as $link)
            <div
                class="bg-white shadow-md
            @if ($link->status == false) shadow-red-400 @endif
                     rounded p-3 space-y-6">
                <div class="flex text-sm items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold">{{ $link->name }}</h3>
                        <p>{{ $link->created_at->diffForHumans() }}</p>
                    </div>


                    @if ($link->status == true)
                        <span class="bg-green-500 size-3 shadow-md rounded-full"></span>
                    @else
                        <span class="bg-red-500 size-3 shadow-md shadow-red-400 animate-pulse rounded-full"></span>
                    @endif
                </div>
                <div class="flex
                text-sm items-center justify-between">
                    <div class="flex items-center gap-4 opacity-55">
                        <a href="{{ $link->url }}">Visit Page</a>

                    </div>
                    <div class="flex gap-2 items-center">
                        @if ($link->status == 0)
                            <form action="{{ route('links.update', $link) }}" method="post">
                                @csrf
                                @method('PUT')
                                <button
                                    class="px-3 text-xs py-1 border-2 rounded border-red-400 text-red-500 hover:bg-red-600 hover:text-white transition-colors flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="size-3"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw">
                                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                        <path d="M3 3v5h5" />
                                    </svg>
                                    Refresh</button>
                            </form>
                        @endif
                        <form action="{{ route('links.destroy', $link) }}" method="post">
                            @csrf
                            @method('DELETE')
                            <button
                                class="px-3 text-xs py-1 rounded hover:bg-red-600 hover:text-white transition-colors  flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="size-3"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    <line x1="10" x2="10" y1="11" y2="17" />
                                    <line x1="14" x2="14" y1="11" y2="17" />
                                </svg>
                                Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        @endforeach
        <div class="my-4">
            {{ $links->links() }}
        </div>
    </div>
</x-layout>
