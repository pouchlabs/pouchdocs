<script lang='ts' >
import Editor from "$lib/Editor.svelte";
import {page} from "$app/stores";
export let data;

data.doc
</script>

<div class="mt-5 mx-auto ">
<Editor doc={data.doc} on:editor_change={e=>console.log(e)}></Editor> 
</div>