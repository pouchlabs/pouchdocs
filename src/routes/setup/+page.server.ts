import { fail, redirect } from '@sveltejs/kit';
import config from "$lib/server/config.ts";
import { createSuper } from '$lib/server/user.ts';

 const setAuthToken = ({cookies, token}) => {
    cookies.set('AuthorizationToken', `Bearer ${token}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/'
    });
  };

console.log(config)
export const actions ={
    create: async ({request,cookies})=>{
      const formdata = Object.fromEntries(await request.formData());

      const token = await createSuper(formdata);

      if(!token){
        throw fail(400)
      }else{
        setAuthToken({cookies, token:token});                          

        throw redirect(302, "/dashboard");
      }
    }
}