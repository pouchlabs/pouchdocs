import {join} from "path";
import {existsSync,mkdirSync} from "fs";
import { nanoid } from "nanoid";
import {chmodr} from "$lib/server/chmod.js";
import Conf from 'conf';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import {PRIVATE_SUPABASE_URL,PRIVATE_SUPABASE_PRIVATE_KEY} from "$env/static/private";


export const supabase = createClient(PRIVATE_SUPABASE_URL, PRIVATE_SUPABASE_PRIVATE_KEY);

export const admdb = supabase.from('admin')
export const docsdb = supabase.from('docs')
export const storage = supabase.storage




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