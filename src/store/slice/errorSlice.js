import { createSlice } from "@reduxjs/toolkit";


const initState = {
    registerErrorMessage:[], 
    loginErrorMessage:[],
    orderErrorMessage:[]
}


const errorSlice = createSlice({
    name:'error',
    initialState:initState,  
    reducers:{
        setRegisterErrorMessage:(state,action)=>{
            state.registerErrorMessage = []; 
            state.registerErrorMessage.push(action.payload)
        }, 

        setLoginErrorMessage:(state,action)=>{
            state.loginErrorMessage = []; 
            state.loginErrorMessage.push(action.payload); 
        }, 

        setOrderErrorMessage:(state,action)=>{
            
        }
    }
})


export const {setRegisterErrorMessage,setLoginErrorMessage,setOrderErrorMessage} =  errorSlice.actions

export default errorSlice.reducer