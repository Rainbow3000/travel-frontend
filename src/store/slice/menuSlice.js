import { createSlice } from "@reduxjs/toolkit";


const initState = {
    enableMenu:false
}


const menuSlice = createSlice({
    name:'menu',
    initialState:initState,  
    reducers:{
        toggleMenuState:(state,action)=>{
            state.enableMenu = action.payload; 
        }, 

    }
})


export const {toggleMenuState} =  menuSlice.actions

export default menuSlice.reducer