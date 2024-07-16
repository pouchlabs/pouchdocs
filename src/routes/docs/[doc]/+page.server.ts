/** @type {import('./$types').EntryGenerator} */
import {supabase} from "$lib/server/config.ts";

export async function load({params}){

	let { data: docs} = await supabase
	.from('docs')
	.select('*').eq('title',params.doc)
   if(!docs){
  //
     return {doc:null}
   }
   let doc = docs.find(d=>d.title === params.doc);

	return {doc}
}
