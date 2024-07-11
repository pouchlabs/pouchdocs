<script lang="ts">
    import Editor,{genHtml} from "sveditorjs";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {SvelteEditor} from '@nextlint/svelte';
    import EditorTheme from '@nextlint/svelte/EditorTheme';
   export let doc;

     doc.data =`<div class="section" id="section-caf0af11">
     users
     </div>
`
      let modes = {
          'js': 'JavaScript',
          'py': 'Python',
          'go': 'Go',
          'cpp': 'C++',
          'cs': 'C#',
          'md': 'Markdown',
        }
    let data = {}; //correct editorjs json data
    let urls = {
    upload:"",
    load:"" //this object should be 
    }

    onMount(()=>{
      fetch($page.url.pathname).then(res=>res.json()).then(resp=>{
      console.log(resp)
    }).catch(err=>{
      console.log(err)
    })
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
        langs: ['c', 'sh', 'javascript', 'html', 'typescript'],
        themes: {
          dark: 'vitesse-dark',
          light: 'vitesse-light'
        }
      }
      }
   
 async function handleChange(ev){
    let editor = ev.detail.editor;
    editor.save().then(async (savedData)=>{
    
    let html = await genHtml(savedData);  
    doc.data = savedData;
    console.log("da",doc.data)
    }).catch((err)=>{console.log(err)})
  }
  let editor;
</script> 
   <div class="editor mt-5 mx-auto  ">
    <EditorTheme>
      <SvelteEditor {plugins} content={doc.data} placeholder="Start editing..."   onChange={_editor => {
        editor = _editor;
        console.log(editor)
      }} />
    </EditorTheme>
   </div>
 
