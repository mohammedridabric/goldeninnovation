import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../components/features/auth/authSlice'
import categoryReducer from '../components/features/category/categorySlice'
import productReducer from '../components/features/product/productSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
    },
})
