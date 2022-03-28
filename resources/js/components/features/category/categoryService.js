import axios from "axios";

const API_URL = '/api/category/'

// create new category
const categoryStore =async (categoryData,token)=>{
    const config = {
        headers : {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL,categoryData,config)

    return  response.data
}
// delete
const categorydelete = async (categoryId)=>{
    localStorage.removeItem('user')
}
//get all
const categoryIndex = async (token)=>{
    const config = {
        headers : {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config)

    return  response.data}

const categoryService ={
    categoryStore,categorydelete, categoryIndex
}

export default categoryService
