import { json,error } from '@sveltejs/kit';
import {supabase} from "$lib/server/config.ts";

export const POST = async ({request,locals,params})=>{
    if(!locals.user){
        return error(401,'unauthorized');
    }else{
        let doc = await request.json();

        const { data, error } = await supabase
  .from('docs')
  .update({ html: doc.html })
  .eq('title', doc.title)
  .select()
  if(data){
    return json(data)
  }
       
    }

   

}