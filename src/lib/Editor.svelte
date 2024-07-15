<script lang="ts">
   
    import {onMount,onDestroy} from "svelte";
    import {page} from "$app/stores";
    import {SvelteEditor} from '@nextlint/svelte';
    import EditorTheme from '@nextlint/svelte/EditorTheme';
    import '$lib/editor.css';
    import axios from "axios";
    import {Button } from "svelte-ux";
    import ls from 'localstorage-slim';
   export let data;
   export let doc;
   let editor;
   let curreditable = doc.html;;

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
          dark: 'vitesse-dark',
          light: 'vitesse-light'
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
         saving = true;
         setTimeout(()=>{
           saving = false
         },3001)
      } catch (error) {
         //
      }
  }
function saveDoc() {
  let html = ls.get(doc.title);
axios.post(`/dashboard/documents/${$page.params.doc}`,{html:html,title:doc.title}).then(resp=>{
      curreditable = resp.data.html;
    }).catch(err=>{
      //console.log(err)
    })
}

</script> 
   <div class="editor p-2 mb-5"  >
    {#if saving }
    <span class="text-success mb-5"  >publishing...</span>
     {/if}

      <SvelteEditor theme='dark' {plugins} bind:content={curreditable} placeholder="Start editing..."  onChange={async _editor =>{handleChange(_editor) ; setTimeout(saveDoc(),3000)}} />
 
   </div>
   <style>
    .editor{
      min-width: 200px !important;
      max-width: 70vw;
      overflow-y: auto;
    }
   </style>
 
