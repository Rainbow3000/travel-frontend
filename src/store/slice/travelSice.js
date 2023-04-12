import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../../requestMethod";


export const getAllTravel = createAsyncThunk(
    "/getAllTravel", 
    async()=>{
        const response = await publicRequest.get('/travel')
        return response.data?.data
    }
)


export const getAllTravelByCategoryId = createAsyncThunk(
    "/getAllTravelByCategoryId", 
    async(categoryId)=>{
        const response = await publicRequest.get(`/travel/getAllTravelByCategoryId/${categoryId}`); 
        return response.data?.data; 
    }
)


const initState = {
  travels: [],
  travelDetails: null,
  travelsByCategoryId: [],
  travelsAfterFilter:[],
  travelsAfterFilterByCategoryId:[], 
  travelBySearch:[]
};

const travelSlice = createSlice({
  name: "travel",
  initialState: initState,
  reducers: {
    getSingleTravel: (state, action) => {
      const travel = state.travels.find((item) => item.id === action.payload);
      state.travelDetails = travel;
    },
    travelFilters:(state,action)=>{
        if(action.payload === 0){
            state.travelsAfterFilter = state.travels.sort((x,y)=>{
                return parseInt(x.id) -  parseInt(y.id); 
            }) 
        }else if(action.payload === 1){
            state.travelsAfterFilter = state.travels.sort((x,y)=>{
                return parseInt(x.travelPriceNew) -  parseInt(y.travelPriceNew); 
            })
        }else if(action.payload === 2){
                state.travelsAfterFilter = state.travels.sort((x,y)=>{
                return parseInt( y.travelPriceNew ) - parseInt (x.travelPriceNew); 
            })
        }else {
            state.travelsAfterFilter = state.travels.sort((x,y)=>{
                return parseInt(x.id) -  parseInt(y.id); 
            }) 
        }
    },

    travelBySearch:(state,action)=>{
        if(action.payload.trim() === ""){
            state.travelsAfterFilter = state.travels; 
            return; 
        }
         state.travelsAfterFilter = state.travels.filter(item=>item.travelName.includes(action.payload)); 
    },
    travelFiltersByCategoryId:(state,action)=>{
        if(action.payload === 0){
            state.travelsAfterFilterByCategoryId = state.travelsByCategoryId.sort((x,y)=>{
                return parseInt(x.id) -  parseInt(y.id); 
            }) 
        }else if(action.payload === 1){
            state.travelsAfterFilterByCategoryId = state.travelsByCategoryId.sort((x,y)=>{
                return parseInt(x.travelPriceNew) -  parseInt(y.travelPriceNew); 
            })
        }else if(action.payload === 2){
                state.travelsAfterFilterByCategoryId = state.travelsByCategoryId.sort((x,y)=>{
                return parseInt( y.travelPriceNew ) - parseInt (x.travelPriceNew); 
            })
        }
    }
  },
  extraReducers:(builder)=>{
        builder.
        addCase(getAllTravel.fulfilled,(state,action)=>{
            state.travels = action.payload;
            state.travelsAfterFilter = action.payload;
        }).
        addCase(getAllTravelByCategoryId.fulfilled,(state,action)=>{
            state.travelsByCategoryId = action.payload; 
            state.travelsAfterFilterByCategoryId = action.payload; 
        })
    
  }
});

export const { setTravelList, getSingleTravel, travelFilters,travelFiltersByCategoryId,travelBySearch} = travelSlice.actions;

export default travelSlice.reducer;
