<script lang="ts">
    import Editor,{genHtml} from "sveditorjs";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
   export let doc;

     doc.data ={
      blocs:[]
     }
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
   
 async function handleChange(ev){
    let editor = ev.detail.editor;
    editor.save().then(async (savedData)=>{
    
    let html = await genHtml(savedData);  
    doc.data = savedData;
    console.log("da",doc.data)
    }).catch((err)=>{console.log(err)})
  }
</script>
<Editor data={doc.data} urls={urls} modes={modes}   on:editor_ready={(ev)=>{console.log("ready",ev.detail)}} on:editor_change ={(ev)=>{handleChange(ev)}} >
    <svelte:fragment slot="top" >
      top
    </svelte:fragment>
    <svelte:fragment slot="aside"  >
     aside
    </svelte:fragment>
  <svelte:fragment slot="extra" >
     extra unstyled
    </svelte:fragment>
  </Editor>