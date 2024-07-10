<script lang="ts">
    import Editor,{genHtml} from "sveditorjs";
    import {onMount} from "svelte";
   export let doc;

     
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

 async function handleChange(ev){
    console.log(ev.detail) 
    let editor = ev.detail.editor;
    editor.save().then(async (savedData)=>{
      // do something with data
      console.log(window.current_sveditor); 
    // use helper to gen html
    let html = await genHtml(savedData);  
    console.log(html);
    }).catch((err)=>{console.log(err)})
  }
</script>
<Editor data={data} urls={urls} modes={modes}   on:editor_ready={(ev)=>{console.log("ready",ev.detail)}} on:editor_change ={(ev)=>{handleChange(ev)}} >
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