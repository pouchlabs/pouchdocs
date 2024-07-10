import jwt from 'jsonwebtoken';
import config from '$lib/server/config.ts';

export const handle = async ({event, resolve}) => {
  const authCookie = event.cookies.get('AuthorizationToken');


  if (authCookie){
    const token = authCookie.split(' ')[1];
 
    try {
      const jwtUser = jwt.verify(token, config.data.secret); 
      const user = config.data.admins.find(su=> su._id === jwtUser.id)
      if (user) {
        event.locals.user = {email:user.email,id:user._id,isadmin:user.isAdmin,name:user.name,isSuper:user.isSuper}; 
      }
    } catch (error) {
      //console.log(error);
    }
  }
  event.locals.adms = config.data.admins;

  return await resolve(event);
};