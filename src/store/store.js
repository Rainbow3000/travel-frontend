import {configureStore} from '@reduxjs/toolkit'

import * as slice from './slice'


const store = configureStore({
    reducer:{
        travel:slice.travelSice, 
        priceTable:slice.priceTableSlice, 
        user : slice.userSlice, 
        error:slice.errorSlice,
        menu:slice.menuSlice
    }
})


export default store; 