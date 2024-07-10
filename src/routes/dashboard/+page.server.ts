import docsdb from "$lib/server/db.ts";

export async function load({request,params,locals}){
    let docs = await  docsdb.allDocs({}).then(docs=>{
        return {totaldocs:docs.total_rows}
     }).catch(err=>{
   
     })
    return {docs:docs.totaldocs} 
} 