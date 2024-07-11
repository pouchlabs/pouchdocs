import Pouchdb from "pouchdb";
import find from "pouchdb-find";
import config from './config.ts';

Pouchdb.plugin(find)
let docsdb = new Pouchdb('pouchdocs-storage/docs',{autocompaction:true});
export let admdb = new Pouchdb('pouchdocs-storage/admin',{autocompaction:true});
export default docsdb 