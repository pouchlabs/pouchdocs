<script>
     import {Notification,Button} from "svelte-ux";
     import {enhance} from "$app/forms";
    export let data;
</script>

<div class="w-[250px] mx-auto shadow-md mt-5 mb-3 p-5">
    <h1>User Auth</h1>

    {#if data?.user}
        <h1>Logged in as user: {data?.user?.email}</h1>
        <form use:enhance method="POST" action="?/logout">
            <Button type="submit" class="bg-primary w-20 h-10 mx-auto" >sign out</Button>
        </form>
    {/if}
    {#if !data?.user}
    <Button href="/auth/login" class="w-20 h-10 mx-auto">Login</Button>
    {/if}
</div>
