import { fail, redirect } from '@sveltejs/kit';
import { createSuper } from '$lib/server/user.ts';
import {supabase} from "$lib/server/config.ts";

 const setAuthToken = ({cookies, token}) => {
    cookies.set('AuthorizationToken', `Bearer ${token}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/'
    });
  };

  export async function load({url}){
    let { data: admin, error } = await supabase
    .from('admin')
    .select('*')
  
      if(admin && admin.length > 0 && url.pathname === '/setup'){ 
        //no adms redirec
        throw redirect(302,'/dashboard') 
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