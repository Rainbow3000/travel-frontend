import axios from "axios";

const baseURL = "http://localhost:8080/api/v1"

const accessToken = JSON.parse(localStorage.getItem('user'))?.accessToken || null; 

const publicRequest = axios.create({
    baseURL:baseURL, 
    timeout:3000
}) 
const userRequest = axios.create({
    baseURL:baseURL, 
    headers:{
        Authorization: `Bearer ${accessToken}` 
    }
}) 



export {publicRequest,userRequest}; 