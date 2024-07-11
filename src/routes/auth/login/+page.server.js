import {fail,error, redirect} from "@sveltejs/kit";
import {setAuthToken} from "../helpers.js";
import {loginUser} from "$lib/server/user.ts";

export const load = ({locals})=>{
  if(locals.user){
    redirect(302,"/dashboard")
  }
}
export const actions = {
  login: async ({cookies, request}) => {
    const formData = Object.fromEntries(await request.formData());
    const {email, password} = formData;

    const token = await loginUser(email, password);

    if (!token) {
      return fail(400, {msg:'bad request'});
    }else{
      setAuthToken({cookies, token});

      throw redirect(302, "/dashboard")
    }

  
  }
}

