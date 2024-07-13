<script lang='ts' >
import Editor from "$lib/Editor.svelte";
import {page} from "$app/stores";
import {Card} from "svelte-ux";
export let data;
console.log(data)
</script>

<div class="mt-5 mx-auto ">
    {#if !data.docs.documents.find(d=>d.title === data.currentDoc.title)}
       <Card class="w-auto h-10 p-2 bg-red-500 mx-auto">
            !oops not found: {$page.params.doc}
       </Card>
    {:else}
   <Editor doc={data.currentDoc} ></Editor>
   {/if} 
</div>