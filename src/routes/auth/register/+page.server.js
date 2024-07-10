import {fail, redirect} from "@sveltejs/kit";
import {setAuthToken} from "../helpers.js";
import {createUser} from "$lib/server/user.ts";

export const actions = {
  register:  async ({cookies, request}) => {
    const formData = Object.fromEntries(await request.formData());
    const {email, password} = formData;

  const token = await createUser(email, password)
  
  if(!token){ 
    throw redirect(302,"/auth/login")
   }else{
      setAuthToken({cookies, token:token});                          

        throw redirect(302, "/");
   }
 


  }
}