<x-layout>
    <div>    
        <h1>Verify Your Account using the email we sent you</h1>
        <p>Didn't get the email ?</p>
        <form action="{{ route('verification.send') }}" method="post">
            @csrf
            <button class="btn">Send Again</button>
        </form>
    </div>


</x-layout>