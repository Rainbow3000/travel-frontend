import {createSlice} from '@reduxjs/toolkit'



const initState = {
    priceTable:[], 
    singlePriceTable:localStorage.getItem('singlePriceTable') ? JSON.parse(localStorage.getItem('singlePriceTable')) : null
}


const priceTableSlice = createSlice({
    name:"priceTable",
    initialState: initState,
    reducers:{
        setPriceTable:(state,action)=>{
            state.priceTable = action.payload; 
        },
        setSinglePriceTable:(state,action)=>{
            state.singlePriceTable = action.payload
        }
    } 
})


export const {setPriceTable,setSinglePriceTable} = priceTableSlice.actions


export default priceTableSlice.reducer; 