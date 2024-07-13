<script lang="ts">
    import {Grid,Card,Header,Icon,Button,Dialog, Form, TextField} from "svelte-ux";
    import { z } from 'zod';
    import {enhance} from "$app/forms";
   import {writable} from "svelte/store";
   import {BROWSER} from "esm-env";
    export let data;
    let open = false;
    let title = {
    name: '',
  };

  const schema = z.object({
  name: z.string().min(3).max(70),
  email: z.string().email().min(3),
  password:z.string().min(8).max(50),
  
  });

  let schemaData = {
    name: '',
    email:'',
    password:""
  };
  var isValid = false;

  function verify(){
    let result = schema.safeParse(schemaData)
    if(!result.success){
       isValid = false;
     return
    }
    isValid=true
  }

</script>

    <div style="max-width: 400px;" class="flex flex-col justify-center mx-auto   gap-3">
        <h1 class="mt-4 mb-4">Setup super admin account </h1>

      <form
       use:enhance
      action='?/create'
      method="post"
      class="sform flex flex-col gap-3 mt-4 mb-4 p-5 shadow-md"
       on:input={(e)=> {verify()}}
    >
      <TextField
        label="name: * (max=50,min=3)"
        type="text"
        name="name"
        bind:value={schemaData.name}
        on:change={(e)=>{schemaData.name =e .detail.value}}
        required
      />
      <TextField
      label="email: * (min=3)"
      type="text"
      name="email"
      bind:value={schemaData.email}
      on:change={(e)=>{schemaData.email = e.detail.value}}
      required
    />
    <TextField
    label="password : * (max=10,min=6)"
    type="text"
    name="password"
   
    bind:value={schemaData.password}
    on:change={(e)=>{schemaData.password = e.detail.value}}
    required
  />
      <div class="mt-2">
        <Button type="submit" class="bg-primary" disabled={isValid === false}>setup</Button>
      </div>
    </form>
    </div>
    <style>
    
    </style>

