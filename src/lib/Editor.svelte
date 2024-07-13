<script lang="ts">
   
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {type Editor,SvelteEditor} from '@nextlint/svelte';
    import EditorTheme from '@nextlint/svelte/EditorTheme';
    import '$lib/editor.css';
    import localforage from "localforage";
    import axios from "axios";
    import {Button } from "svelte-ux";
   export let data;
   export let doc;
   let editor;
   let curreditable;

    onMount(async ()=>{
      //
      curreditable = doc.html;
      //save to local
      localforage.setItem('pouchdocs_current_editable',curreditable).then(re=>{
        curreditable = re
      }).then(e=>{

      });
    
    
    })
    let plugins = {
        image: {
          handleUpload:(file)=>{
            // handle upload here
                const blob = new Blob([file]);
                const previewUrl = URL.createObjectURL(blob);
                return previewUrl;
          },
          unsplash: {
            accessKey: 'UNPLASH_API_KEY'
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
    // },
    // codeBlock: {
    //     langs: ['c', 'sh', 'javascript', 'html', 'typescript'],
    //     themes: {
    //       dark: 'vitesse-dark',
    //       light: 'vitesse-light'
    //     }
    //   }
      }
  
 async function handleChange(ev){
   editor = ev;
   localforage.setItem('pouchdocs_current_editable',editor.getHTML()).then(async re=>{
        curreditable = re
    });
 
  }
async function saveDoc() {
  let html = await localforage.getItem("pouchdocs_current_editable")
axios.post(`/dashboard/documents/${$page.params.doc}`,{html:html,title:doc.title}).then(resp=>{
      console.log(resp)
    }).catch(err=>{
      console.log(err)
    })
}

</script> 
   <div class="editor p-2"  >
    {#if data.user && data.user.isSuper}
     <Button class="bg-success mb-5" on:click={()=>saveDoc()} >publish</Button>
     {/if}
    <EditorTheme>
      <SvelteEditor {plugins} bind:content={curreditable} placeholder="Start editing..."  onChange={_editor =>handleChange(_editor)} />
    
    </EditorTheme>
     
   </div>
   <style>
    .editor{
      min-width: 200px !important;
    }
   </style>
 
