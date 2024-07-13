import {admdb} from "$lib/server/config.ts";
import { redirect } from "@sveltejs/kit";

export async function load({locals,url}){
  try {
    const res = await admdb.select("*")
    if(res.data && res.data.length === 0 && url.pathname !== '/setup'){ 
      throw redirect(302,'/setup') 
     }
   
   } catch (error) { 
    //
    if(error && error.status === 302){
      throw redirect(302,'/setup') 
    }
   } 
//user
   if(locals.user){ 
      let user = locals.user;
      return {user}
   }  
 } 
   