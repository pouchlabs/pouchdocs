import {join} from "path";
import {existsSync,mkdirSync} from "fs";
import { nanoid } from "nanoid";
import {chmodr} from "$lib/server/chmod.js";
import Conf from 'conf';

const config = new Conf({cwd:join(process.cwd(),"pouchdocs-storage"),projectName: 'pouchdocs',configFileMode:0o777});  
async function init(){
 if(!config.get('secret')){
  config.set('secret',nanoid(32))
  chmodr(join(process.cwd(),"pouchdocs-storage"), 0o777, (err) => {
    if (err) {
      console.log('Failed to execute chmod', err);
    } else {
      console.log('Success');
    }
  });
 }  
 return config;  
}

export default await init()