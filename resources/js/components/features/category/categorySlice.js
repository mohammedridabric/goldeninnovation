import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import categoryService from "./categoryService";
import  {toast} from "react-toastify";


const initialState ={
    categories : [],
    isError     :false,
    isSuccess   :false,
    isLoading   : false,
    message     :'',
}
//create new category
export  const categorystore = createAsyncThunk('category/store',async (category,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.access_token
        return await categoryService.categoryStore(category,token)
    }catch (error) {
        const message =(error.response && error.response.data && error.response.data.message )|| error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//delete
export  const categorydelete = createAsyncThunk('category/delete',async (categoryId,thunkAPI)=>{
    try {
        return await categoryService.categorydelete(categoryId)
    }catch (error) {
        const message =(error.response && error.response.data && error.response.data.message )|| error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all Category
export  const getCategory = createAsyncThunk('category/all',async (_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.access_token
        return await categoryService.categoryIndex(token)
    }catch (error) {
        const message =(error.response && error.response.data && error.response.data.message )|| error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const categorySlice = createSlice({
    name :'category',
    initialState,
    reducers:{
        reset: (state)=>initialState,
    },
    extraReducers: (builder)=>{
        builder
            .addCase(categorystore.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(categorystore.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.categories.push(action.payload)
                toast.success('Category created Successfully!! ')

            })
            .addCase(categorystore.rejected,((state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }))
            .addCase(getCategory.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getCategory.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.categories = action.payload
            })
            .addCase(getCategory.rejected,((state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }))
    }
})

export const {reset} = categorySlice.actions
export default categorySlice.reducer
