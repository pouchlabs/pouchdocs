import { json,error } from '@sveltejs/kit'
export const GET = ({request,locals,params,url})=>{
    if(!locals.user)return error(401,'unauthorized');

    return json('get')

}