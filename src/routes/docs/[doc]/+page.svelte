<script lang="ts">
import {Button,Card} from "svelte-ux";
import {page} from "$app/stores";
import {onMount} from "svelte";
export let data;

onMount(()=>{
	let article = document.querySelector('article');
	
	article.innerHTML = data.doc.html;
	let pre = document.querySelectorAll('pre');
	pre.forEach(el=>{
		el.classList.add('shadow-md')
		el.classList.add('p-2')
		el.classList.add('rounded')
		el.classList.add('dark:bg-neutral-400')
	})
})

</script>
{#if !data.doc}
<Card  class="bg-red-500 w-auto mt-2 h-20 mx-auto">
   !oops not found<br/>
   {$page.params.doc}
</Card>
{:else}
<main class="p-2 grid place-items-center content-center">
	{#if data.user}
	   <Button class='bg-primary' href={`/dashboard/documents/${data.doc.title}`}>edit</Button>
	{/if}
	<h1>{data.doc.title}</h1>
     <article>

	 </article>
</main>
{/if}
