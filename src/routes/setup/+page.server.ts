import { fail, redirect } from '@sveltejs/kit';
import { createSuper } from '$lib/server/user.ts';
import {admdb} from "$lib/server/config.ts";
 const setAuthToken = ({cookies, token}) => {
    cookies.set('AuthorizationToken', `Bearer ${token}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/'
    });
  };

  export async function load({request,params,locals,url}){
    try {
      const res = await admdb.select("*")
      if(res.data && res.data.length > 0 && url.pathname === '/setup'){ 
        //no adms redirec
        throw redirect(302,'/dashboard') 
       }
     } catch (error) { 
      //
      console.log(error)
      if(error && error.status === 302){
        throw redirect(302,error.location) 
      }
     } 
   } 
     

export const actions ={
    create: async ({request,cookies})=>{
      const formdata = Object.fromEntries(await request.formData());

      const token = await createSuper(formdata);

      if(!token){
        return fail(400)
      }else{
        setAuthToken({cookies, token:token});                          

        throw redirect(302, "/dashboard");
      }
    }
}