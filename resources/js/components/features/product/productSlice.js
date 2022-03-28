import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import productService from "./productService";
import {toast} from "react-toastify";


const initialState ={
    products : [],
    isError     :false,
    isSuccess   :false,
    isLoading   : false,
    message     :'',
}
//create new Product
export  const   productstore = createAsyncThunk('product/store',async (product,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.access_token
        return await productService.productStore(product,token)
    }catch (error) {
        const message =(error.response && error.response.data && error.response.data.message )|| error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//delete Product
export  const productdelete = createAsyncThunk('product/delete',async ( productId,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.access_token

        return await productService.productDelete(productId,token)
    }catch (error) {
        const message =(error.response && error.response.data && error.response.data.message )|| error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all Products
export  const getProduct = createAsyncThunk('product/all',async (_,thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.access_token
            return await productService.productIndex(token)
        }catch (error) {
            const message =(error.response && error.response.data && error.response.data.message )|| error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

export const productSlice = createSlice({
    name :'product',
    initialState,
    reducers:{
        reset: (state)=>initialState,
    },
    extraReducers: (builder)=>{
        builder
            .addCase(productstore.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(productstore.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.products.push(action.payload.product)
                toast.success( action.payload.message)

            })
            .addCase(productstore.rejected,((state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.success( state.message)

            }))

            .addCase(productdelete.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(productdelete.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.products = state.products.filter((product)=> product.id !== +action.payload.id)
                toast.success(action.payload.message)

            })
            .addCase(productdelete.rejected,((state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error( state.message)

            }))

            .addCase(getProduct.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getProduct.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProduct.rejected,((state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }))
    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer
