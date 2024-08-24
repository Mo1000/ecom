//@ts-ignore
import ParseJS from "parse/dist/parse.min.js";
import Parse from "parse";


const masterKey = "masterkey";
const appId = "appId";
const javascriptKey = "jskey";
const serverURL = import.meta.env.VITE_PUBLIC_API_BASE_URL;
ParseJS.initialize(appId, javascriptKey, masterKey);
ParseJS.serverURL = serverURL;
export  default ParseJS as typeof Parse;

