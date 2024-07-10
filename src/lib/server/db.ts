import Pouchdb from "pouchdb";
import find from "pouchdb-find";
import config from './config.ts';

Pouchdb.plugin(find)
let docsdb = new Pouchdb('docs',{autocompaction:true});
export let admdb = new Pouchdb('admin',{autocompaction:true});
export default docsdb