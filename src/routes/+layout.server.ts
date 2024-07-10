import docsdb from "$lib/server/db.ts";
import { redirect } from "@sveltejs/kit";

export async function load({request,params,locals,url}){
  if(locals.adms && locals.adms.length === 0 && url.pathname !== '/setup'){ 
   //no adms redirec
   throw redirect(302,'/setup') 
  }
   if(locals.user){
      let user = locals.user;
      return {user}
   } 

   
 
 } 
   