import {join} from "path";
import {existsSync,mkdirSync} from "fs";
import { nanoid } from "nanoid";
import {chmodrSync} from "$lib/server/chmod.js";
import Conf from 'conf';

const config = new Conf({cwd:join(process.cwd(),"pouchdocs-storage"),projectName: 'pouchdocs',configFileMode:0o777});  
async function init(){
 if(!config.get('secret')){
  config.set('secret',nanoid(32))
 }  
 return config;  
}

export default await init()