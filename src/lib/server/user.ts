import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {supabase} from "./config.ts";
import config from "./config.ts";


function createJWT(user) {
  return  jwt.sign({id: user.id, email: user.email,isAdmin:user.isAdmin,isSuper:user.isSuper}, config.get("secret"), {
    expiresIn: '1d'
  });
}
export async function createSuper(form){
  let {email,name,password} = form;
  let user = {
    name,
    email,
    password: await bcrypt.hash(password, 12),
    isSuper:true,
    isAdmin:true,
   }

   try{
    const {data,error} = await supabase.from('admin').insert(user).select()
    if(data){
      let token = createJWT(data)
      return token
    }
   }catch(err){
    //console.log(err)
   }
}

export async function loginUser(email, password) {

    const user = await supabase.from('admin').select("*").eq("email",email)
   
    if (!user.data) {
   //no user
      return null
    }
    //exists
    const fuser = user.data.find(async da=>da.password === password)
    
    const valid = await bcrypt.compare(password, fuser.password);
   
    if (!valid) {
      //pass not valid
      return null
    }
     //valid
    const token = createJWT(fuser);

    return token;
}
