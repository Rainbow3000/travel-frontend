import {createSlice} from '@reduxjs/toolkit'

const initState = {
    user: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null
}

const userSlice = createSlice({
    name:"user",
    initialState:initState, 
    reducers:{
        setUser:(state,action)=>{
            localStorage.setItem('user',JSON.stringify(action.payload)); 
            state.user = action.payload; 
        },
        userLogout:(state)=>{
            localStorage.clear();  
            localStorage.removeItem("user");
        }
    }
})


export const {setUser,userLogout} = userSlice.actions; 


export default userSlice.reducer; 