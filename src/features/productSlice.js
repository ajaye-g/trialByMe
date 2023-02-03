import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    items: [],
    status: null
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async() => {
        const response = await axios.get("")
        return response?.data
    }
)

const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers: {},
    extraReducers: {
        
    }

})
export default productsSlice.reducer;