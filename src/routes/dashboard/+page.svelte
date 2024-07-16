<script lang="ts">
  import {Grid} from "svelte-ux";
  export let data;
</script>
 <span class="text-primary p-1 my-2 mx-2"> dashboard </span>
<Grid columns={4} class='my-2' >
 
    <div class="shadow-sm p-2 rounded flex flex-col">
      <span class="text-primary">total docs</span>
      <span>{data.docs?.totaldocs}</span>
    </div>
  
</Grid>