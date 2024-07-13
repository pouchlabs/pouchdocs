<script lang='ts' >
import Editor from "$lib/Editor.svelte";
import {page} from "$app/stores";
import {Card,Breadcrumb} from "svelte-ux";
export let data;

let items = ['Documents',$page.params.doc];

</script>

<div class="mt-5 mx-auto ">
    {#if !data.docs.documents.find(d=>d.title === data.currentDoc.title)}
       <Card class="w-auto h-10 p-2 bg-red-500 mx-auto">
            !oops not found: {$page.params.doc}
       </Card>
    {:else}
    <Breadcrumb {items} class="gap-1" />
    <div class="h-auto mx-auto">
        <div class="shadow-md w-full">
            <Editor doc={data.currentDoc} {data}  ></Editor>
        </div>
        
    </div>
   
   {/if} 
</div>