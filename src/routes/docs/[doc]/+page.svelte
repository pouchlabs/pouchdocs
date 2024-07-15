<script lang="ts">
import {Button,Card} from "svelte-ux";
import {page} from "$app/stores";
import {onMount} from "svelte";
import '$lib/article.css'; 

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
<main class="p-2  flex flex-col items-center content-center w-screen h-screen">
	{#if data.user}
	<h1 class="text-xl">{data.doc.title}</h1>
	   <Button class='bg-primary' href={`/dashboard/documents/${data.doc.title}`}>edit</Button>
	{/if}
	 
	<div class="flex flex-row flex-wrap">
		<div class="w-[200px] h-[200px] shadow-md  rounded">
			ad 
		</div>
	
		<article class="p-2 mt-2 mb-2">
      
		</article>
		<div class="w-[200px] h-[200px] shadow-md  rounded sticky top-[70px]">
			ad 
		</div>
	
	</div>
   
</main>
{/if}
