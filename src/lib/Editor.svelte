<script lang="ts">
   
    import {onMount,onDestroy} from "svelte";
    import {page} from "$app/stores";
    import {SvelteEditor} from '@nextlint/svelte';
    import EditorTheme from '@nextlint/svelte/EditorTheme';
    import {Button} from "svelte-ux";
    import '$lib/editor.css';
    import axios from "axios";
    import ls from 'localstorage-slim';

   export let doc;
   let editor;
   let curreditable = doc.html;;

   //editor might change in the future

    onMount(async ()=>{
      //
 
      //save to local
      try {
        ls.set(doc.title,curreditable)
        let saved = ls.get(doc.title);
        curreditable = saved
      } catch (error) {
         //
      }

    })
    let plugins = {
        image: {
          handleUpload:(file)=>{
            // handle upload here
                const blob = new Blob([file]);
                const previewUrl = URL.createObjectURL(blob);
                return previewUrl;
          }
        },
        dropCursor: {
      width:'2px',
      color:'#000',
      },
      codeBlock: {
        langs: ['sh', 'javascript', 'html', 'typescript'],
        themes: {
          dark: 'one-dark-pro',
          light: 'one-light'
        }
      }
 
      }
      let saving = false;
 async function handleChange(ev){
   editor = ev;
   try {
        ls.set(doc.title,editor.getHTML())
        let saved = ls.get(doc.title);
        curreditable = saved
       
      } catch (error) {
         //
      }
  }
function saveDoc() {
  let html = ls.get(doc.title);
axios.post(`/dashboard/documents/${$page.params.doc}`,{html:html,title:doc.title}).then(resp=>{
      curreditable = resp.data.html;
         setTimeout(()=>{
           saving = false
         },3001)
    }).catch(err=>{
      //console.log(err)
    })
}


</script> 
<Button class='bg-success sticky top-[60px] left-1' on:click={()=>{ saving=true; setTimeout(saveDoc(),3000)}} disabled={saving === true}>
   {#if saving === true  }
   <span class=" mb-5"  >publishing...</span>
   {:else}
    publish
    {/if}
</Button>
   <div class="editor w-100 p-2 mb-5"  >
   
     <EditorTheme  >
      <SvelteEditor { plugins } placeholder="start writting .." onChange={(ed)=>{handleChange(ed)}} bind:content={curreditable}  ></SvelteEditor>
     </EditorTheme>
   </div>
   <style>
    .editor{
      min-width: 200px !important;
      width: 50vw;
      overflow-y: auto;
      max-height: calc(100vh-10px);
    }
   </style>
 
