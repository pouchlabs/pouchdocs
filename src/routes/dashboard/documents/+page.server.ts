import docsdb from "$lib/server/db.ts";
import { redirect } from "@sveltejs/kit";
export async function load({request,params,locals}){
    let doc = await  docsdb.allDocs({}).then(docs=>{
      
        return {totaldocs:docs.rows} 
     }).catch(err=>{
   
     })
     console.log(doc)
    return {docs:doc.totaldocs}
} 
export const actions = {
    create:async ({request,params,locals})=>{
        const formdata = Object.fromEntries(await request.formData());
        
        docsdb.get(formdata.title).then(doc=>{
            //exists

        }).catch( async _=>{ 
            //save
            let doc = {}
            doc._id = formdata.title;
            doc.title = formdata.title;
            doc.html = ''
            try {
         
                const resp = await docsdb.put(doc);
                locals.currentdoc = {
                    location:`/dashboard/documents/${resp.id}`
                }
            
              } catch (err) {
               
              }
        })
        console.log(locals)
    }
}