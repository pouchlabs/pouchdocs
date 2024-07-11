import {admdb} from "$lib/server/db.ts";
import { redirect } from "@sveltejs/kit";

export async function load({locals,url}){
  try {
    let all = await admdb.allDocs({});
    if(all.total_rows === 0 && url.pathname !== '/setup'){ 
      //no adms redirec
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
   