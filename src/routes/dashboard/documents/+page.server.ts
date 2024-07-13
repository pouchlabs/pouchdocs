import {docsdb,supabase} from "$lib/server/config.ts";
import { redirect,fail } from "@sveltejs/kit";

export const actions = {
    create:async ({request,params,locals})=>{
        const formdata = Object.fromEntries(await request.formData());
 
            //new
            const newdoc = {
                title:formdata.title
            }
            let res = await docsdb.insert(newdoc).select()
            if(res.error){
                return fail(400)
            }
            if(res.data){
                res.data.map(doc=>{
                    redirect(302,`/dashboard/documents/${doc.title}`)
                })
                
            }
        }
    
}