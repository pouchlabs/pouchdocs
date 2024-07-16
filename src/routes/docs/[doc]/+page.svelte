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
		el.classList.add('dark:bg-[#1212]')
	})
})

</script>
{#if !data.doc}
<Card  class="bg-red-500 w-auto mt-2 h-20 mx-auto">
   !oops not found<br/>
   {$page.params.doc}
</Card>
{:else}
<main class="p-4  flex flex-col items-center content-center w-100 h-100">
	{#if data.user}
	<h1 class="text-xl">{data.doc.title}</h1>
	   <Button class='bg-primary' href={`/dashboard/documents/${data.doc.title}`}>edit</Button>
	{/if}
	 
	<div class="flex flex-row flex-wrap mx-2">
		<div hidden class="w-[200px] h-[200px] shadow-md mx-auto  rounded">
			ad 
		</div> 
	
		<article class="px-5 text-wrap mt-2 mb-2">
      
		</article>
		<div hidden class="w-[200px] h-[200px] mx-auto shadow-md  rounded sticky top-[70px]">
			ad 
		</div>
	
	</div>
   
</main>
{/if}
