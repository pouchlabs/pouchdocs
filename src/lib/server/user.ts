import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {admdb} from "./config.ts";
import { nanoid } from "nanoid";
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
    const {data,error} = await admdb.insert(user).select()
    if(data){
      let token = createJWT(data)
      return token
    }
   }catch(err){
    //console.log(err)
   }
}

export async function createUser(email, password) {
 
    admdb.get(email)
    .then(async (doc)=>{ 
    return null
    })
    .catch((err)=>{
      //register user
      admdb.allDocs({include_docs: true, descending: true}, async function(err, doc) {

            if(doc.rows.length === 0){
               //first adm
                
               let newuser = {}
               newuser._id = email;
               newuser.email=email
               newuser.password = await bcrypt.hash(password, 12)
               newuser.isAdmin = true
                   //create
                   admdb.put(newuser, function callback(err, result) {
                      if (!err) {
                          let token = createJWT(newuser)
                          return token
                       }
                    });
    }else{
      //regular user
            let newuser = {}
             newuser._id = email;
             newuser.email=email
             newuser.password = await bcrypt.hash(password, 12)
             newuser.isAdmin = false
             admdb.put(newuser, function callback(err, result) {
              if (!err) {
                  let token = createJWT(newuser)
                  return token
               }
            });
    }})

    })

   
}

export async function loginUser(email, password) {
  try {
    const user = await admdb.get(email);
    if (!user) {
      return null
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null
    }

    const token = createJWT(user);

    return token;
  } catch (err) {
    //
    return null
  }
}
