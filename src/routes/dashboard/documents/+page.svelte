<script lang="ts">
    import {Grid,Card,Header,Icon,Button,Dialog,Toggle,Menu,MenuItem,NavItem, Form, TextField} from "svelte-ux";
    import { z } from 'zod';
    import {enhance} from "$app/forms";
    export let data;
    let open = false;
  
  const schema = z.object({
  title: z.string().max(200),
  
  });

  let schemaData = {
    title: 'g',
  };
  </script>
   <span class="text-primary p-1 my-2 mx-2"> documents </span>
   {#if data.user.isSuper}
   <Button on:click={() => (open = true)}>create document</Button>
   <Dialog bind:open class="w-50 h-50">
     <div slot="title">Create new document</div>

     <div slot="actions">
       <Button variant="fill" color="primary">Close</Button>
     </div>
 
      <form
       use:enhance
      action='?/create'
      method="post"
    >
      <TextField
        label="title"
        type="text"
        name="title"
        bind:value={schemaData.title}
        on:change={(e)=>{schemaData.title = e.target.value}}
      />
      <Button type='submit'  disabled={schemaData.title == null}>Apply</Button>
      <div class="mt-2">
      
      </div>
    </form>
    
   </Dialog>
   {/if}
   <Grid columns={4} gap={2}>
      {#if data.docs.totaldocs > 0}
      {#each data.docs.documents as doc}
      <Card>
        <Header title={doc.title} subheading={doc.title} slot="header">
          <div slot="actions">
            <Toggle let:on={open} let:toggle let:toggleOff>
              <Button on:click={toggle}>
                <Icon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                    <path fill="currentColor" fill-rule="evenodd" d="M6.5 2.5a1 1 0 1 1 2 0a1 1 0 0 1-2 0m0 5a1 1 0 1 1 2 0a1 1 0 0 1-2 0m0 5a1 1 0 1 1 2 0a1 1 0 0 1-2 0" clip-rule="evenodd" />
                  </svg>
                 </Icon>
                
                <Menu {open} on:close={toggleOff} autoPlacement class="px-3">
             
                 <MenuItem >
                  <Button href={`/dashboard/documents/${doc.title}`}>edit</Button>
                  <form use:enhance action="?/delete" method="post">
                    <input hidden  name="title" value={doc.title}/>
                     <Button type='submit'>Delete</Button>
                  </form>
                </MenuItem>
                
                </Menu>
              </Button>
              </Toggle>
          </div>
        </Header>
      </Card>
      {/each}
      {:else}
        no docs
      {/if}
   </Grid>
