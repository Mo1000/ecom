//@ts-ignore
import Parse from 'parse/dist/parse.min.js'
import ParseJS from 'parse'

const masterKey = 'masterkey'
const appId = 'appId'
const javascriptKey = 'jskey'
const serverURL = import.meta.env.VITE_PUBLIC_API_BASE_URL_PARSE
Parse.initialize(appId, javascriptKey, masterKey)
Parse.serverURL = serverURL
export default Parse as typeof ParseJS
