import axios from "axios";

const baseURL = "https://proud-time-production.up.railway.app/api/v1"
 

const publicRequest = axios.create({
    baseURL:baseURL
}) 
const userRequest = axios.create({
    baseURL:baseURL
}) 



export {publicRequest,userRequest}; 