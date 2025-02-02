<div>
    <h1>
        Hey {{ $username ?? "There" }},
    </h1>
    <p>Your website {{ $url }} seems to be down</p>

    @if(isset($error))
        <p>Error: {{ $error }}</p>
    @endif


    <p>You'll need to refresh the link from your dashboard to resume monitoring. If the issue persists, please verify that your website is accessible and functioning properly.</p>

    <p>If this is expected that ignore this message</p>
</div>
