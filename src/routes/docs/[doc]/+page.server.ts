/** @type {import('./$types').EntryGenerator} */
// import lite from "$lib/server/db.ts";

// let docsdb = await lite.useDb('docs')

export function entries() {
	return [
		{ doc: 'intro' }, 
		{ doc: 'another' } 
	]; 
}

export function load({request,params}){
 console.log(params)
}

export const prerender = true;