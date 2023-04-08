import axios from "axios";

const baseURL = "http://localhost:8080/api/v1"

const publicRequest = axios.create({
    baseURL:baseURL, 
    headers:{
       
    },
    timeout:3000
}) 


export {publicRequest}; 