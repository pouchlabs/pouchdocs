<script lang='ts' >
import Editor from "$lib/Editor.svelte";
import {page} from "$app/stores";
export let data;

console.log(data.doc)
</script>

<Editor doc={data.doc} on:editor_change={e=>console.log(e)}></Editor> 
