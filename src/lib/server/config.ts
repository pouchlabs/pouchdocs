import { JSONFilePreset } from "lowdb/node";
import {join} from "node:path";
import {existsSync} from "node:fs";
import { nanoid } from "nanoid";




async function init(){
    let defaultconf = {
        secret:'',
        admins:[],
        path:join(process.cwd(),"pouchdocs.json")
    }
    
 if(!existsSync(defaultconf.path)){
   let config = await JSONFilePreset(defaultconf.path,defaultconf)
   config.data.secret = nanoid(32);
  config.write()
   return config ;
 }
 return await JSONFilePreset(defaultconf.path,defaultconf);
   
}

export default await init()