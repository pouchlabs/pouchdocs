<script lang="ts">
    import {page} from "$app/stores";
    import {Notification,Button} from "svelte-ux";
    import {enhance} from "$app/forms";
    export let data;
</script>

{#if $page.form }
<div class="w-[400px] mx-auto">
  <Notification open  closeIcon>
    <div slot="title" class="">{$page.form.msg}</div>
  </Notification>
</div>
 
{/if}
<div class="w-[500px] mx-auto shadow-md mt-3 mb-3 p-5">
  <h1 class="mb-2 mt-2" >User Auth Login</h1>
  <form use:enhance method="POST" action="?/login" class="flex gap-3 flex-col mt-8">

    <input required type="email" name="email" placeholder="Email Address" />
    <input required type="password" name="password" placeholder="Password"/>
    <Button type="submit" class='bg-primary'>Log In</Button>
</form>
</div>
