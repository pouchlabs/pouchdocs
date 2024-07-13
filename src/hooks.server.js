import jwt from 'jsonwebtoken';
import config,{supabase} from '$lib/server/config.ts';

export const handle = async ({event, resolve}) => {
  const authCookie = event.cookies.get('AuthorizationToken');

  if (authCookie){
    const token = authCookie.split(' ')[1];
 
    try {
      const jwtUser = jwt.verify(token, config.get("secret"));
      const res = await supabase.from('admin').select("*").eq('email',jwtUser.email)
      if (res.data && res.data.length > 0) {
        res.data.map(user=>{
          event.locals.user = {email:user.email,id:user.id,isadmin:user.isAdmin,name:user.name,isSuper:user.isSuper}; 
        })
      }
    } catch (error) {
      //console.log(error);
    }
  }
  return await resolve(event);
};
