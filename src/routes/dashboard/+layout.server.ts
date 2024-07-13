import { redirect,fail } from '@sveltejs/kit';
import {supabase} from "$lib/server/config.ts";


export const load = async ({locals}) => {
    const user = locals.user;
    let { data: docs, error } = await supabase
    .from('docs')
    .select('*')

    if(!user){
     throw redirect(302,"/auth") 
    } 
    if(error)return fail(400);
   
    return {user,docs:{totaldocs:docs.length,documents:docs}};
  };