<script lang="ts">
    import {page} from "$app/stores";
  console.log($page)
</script>
<h1>User Auth Login</h1>
{#if $page.form }
 {$page.form.msg}
{/if}
<form method="POST" action="?/login" class="p-8 mt-8">

    <input type="email" name="email" placeholder="Email Address" />
    <input type="password" name="password" placeholder="Password"/>
    <button type="submit">Log In</button>
</form>

<a href="/auth">User Auth</a>
