import axios from "axios";

const API_URL = '/api/product/'

// create new product
const productStore =async (productData,token)=>{
    const config = {
        headers : {
            Authorization:`Bearer ${token}`,
            'content-type': 'multipart/form-data'

        }
    }
    const response = await axios.post(API_URL,productData,config)

    return  response.data
}
// delete product
const productDelete = async (productId,token)=>{
    const config = {
        headers : {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+productId,config)

    return  response.data
}
//get all products
const productIndex = async (token)=>{
    const config = {
        headers : {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config)

    return  response.data}

const productService ={
    productStore,productDelete,productIndex
}

export default productService
