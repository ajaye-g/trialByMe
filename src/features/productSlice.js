import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// import { Action } from "@remix-run/router";
import axios from "axios"

const initialState = {
    items: [],
    status: null,
    error:null
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async(id=null,{rejectWithValue}) => {
        try{
            const response = await axios.get("https://fakestoreapi.com/products")
            return response?.data
        } catch(error){
            return rejectWithValue("error occured");
        }
       
    }
)

const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]:(state, Action) => {
            state.status ="pending";
        },
         [productsFetch.fulfilled]:(state, Action) => {
            state.status ="success";
            state.items=Action.payload;
            // console.log(state.items);
        },
         [productsFetch.rejected]:(state, Action) => {
            state.status ="rejected";
            state.error = Action.payload
        }
    }

})
export default productsSlice.reducer;