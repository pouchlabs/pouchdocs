import { error, fail,redirect } from '@sveltejs/kit';
import docdb from "$lib/server/db.ts";

export const load = async ({params,locals})=>{
    let doc = await docdb.get(params.doc).then(doc=>{
          return doc
      }).catch(err =>{
         return error(err.status,'not found');
      })

      
        if(doc){
            return {doc:doc}
        }
      
      

   if(!locals.user){
     throw redirect(302,"/")
   } 


}