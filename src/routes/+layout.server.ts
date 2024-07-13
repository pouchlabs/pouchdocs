import {admdb,supabase} from "$lib/server/config.ts";
import { redirect } from "@sveltejs/kit";

export async function load({locals,url}){

    let { data: admin, error } = await supabase
    .from('admin')
    .select('*')
   
    if(admin && admin.length === 0 && url.pathname !== '/setup'){ 
      throw redirect(302,'/setup') 
     }
   
 
//user
   if(locals.user){ 
      let user = locals.user;
      return {user}
   }  
 } 
   