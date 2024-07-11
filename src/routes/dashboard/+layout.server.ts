import { redirect } from '@sveltejs/kit';
export const load = async ({locals}) => {
    const user = locals.user;
    if(!user){
     throw redirect(302,"/auth") 
    }

    return {user};
  };