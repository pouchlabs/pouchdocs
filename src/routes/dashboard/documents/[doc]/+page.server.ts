import { error, fail,redirect } from '@sveltejs/kit';
import {docsdb,supabase} from "$lib/server/config.ts";

export const load = async ({params,locals})=>{
  if(!locals.user){
    throw redirect(302,"/")
  } 
  let { data: document, error } = await supabase
  .from('docs')
  .select("*")
  .eq('title', params.doc)

  if(error)return fail(400);

     return {doc:document}





}