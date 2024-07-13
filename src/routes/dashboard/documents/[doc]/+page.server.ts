import { error, fail,redirect } from '@sveltejs/kit';
import {supabase} from "$lib/server/config.ts";

export const load = async ({params,locals})=>{
  if(!locals.user){
    throw redirect(302,"/")
  } 
  let { data: doc, error } = await supabase
  .from('docs')
  .select("*")
  .eq('title', params.doc)

  if(!doc){return {currentDoc:''}}
  else{
    return {currentDoc:doc}
  }

  

}