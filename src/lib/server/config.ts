import {join} from "path";
import {existsSync,mkdirSync} from "fs";
import { nanoid } from "nanoid";
import {chmodrSync} from "$lib/server/chmod.js";
import Conf from 'conf';

const config = new Conf({projectName: 'pouchdocs'});


async function init(){
    
  
    
 if(!existsSync(join(process.cwd(),"/pouchdocs-storage"))){

  try {
    mkdirSync(join(process.cwd(),"/pouchdocs-storage"),{recursive:true})
    
   chmodrSync(process.cwd(), 0o777);
   
    config.set('secret',nanoid(32))
    config.set('admins',[])
  } catch (error) {
     console.log(error) 
  }
  
   return config ;
 }

 return config;
   
} 

export default await init()