import React, {useEffect, useState} from 'react'
import {useDispatch,useSelector} from "react-redux";
import { getCategory} from "../../features/category/categorySlice";
import {productstore, getProduct,productdelete} from "../../features/product/productSlice";

function Product() {

    const [formData,setFormData]=useState({
        title :'',
        description:'',
        date:'',
        category_id:'',
        multipleFiles:'',
    });

    const  {title,description,date,multipleFiles,category_id} = formData;

    const { categories} = useSelector((state => state.category))

    const { products , isError     , isSuccess   , isLoading   , message    } = useSelector((state => state.product))

    const dispatch = useDispatch()


    const onchange =(e)=>{
        setFormData((prevState)=>({
            ...prevState,[e.target.name]: (e.target.name !== "multipleFiles")? e.target.value: e.target.files

        }))
    };

    const onSelect =(e)=>{
        setFormData((prevState)=>({
            ...prevState,[e.target.name]:e.target.value
        }))
    };







    const onSubmit =(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('category_id', category_id);

        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append(`filename[${i}]`,  multipleFiles[i])
        }

        dispatch(productstore(formData))

        console.log(formData)
    };

    const onDelete =(id)=>{

        dispatch(productdelete(id))
    }

    useEffect(()=>{
        if (isError){
            console.log(message)
        }
        dispatch(getCategory())
        dispatch(getProduct())


    },[isError,message,dispatch])


    return (
        <>
            <div className='container-fluid m-auto text-center'>
                <div className='mx-auto my-5 p-4 w-50 '>
                    <div className='row'>
                        <div className='col-md-12'>
                            <form onSubmit={onSubmit}   >
                                <h1 className="h3 mb-3 fw-normal text-center m-2">New Product</h1>

                                <div className='form-group my-2'>
                                    <input value={title} name='title' onChange={onchange}  type="text" className="form-control form-control-sm" placeholder="Add  Product Title"  required/>
                                </div>
                                <div className='form-group my-2'>
                                    <input value={description} name='description' onChange={onchange}  type="description" className="form-control form-control-sm"  placeholder="Add  Product description" required/>
                                </div>
                                <div className='form-group my-2'>
                                    <input value={date} name='date' onChange={onchange}  type="date" className="form-control form-control-sm" placeholder="Add  Product date"  required/>
                                </div>
                                <div className='form-group my-2'>
                                    <select name='category_id' onChange={onchange}  className="form-control form-control-sm" placeholder=""  required>
                                        {categories.length>0  ?  categories.map((item)=>(
                                            <option value={item.id} key={item.id}>{item.title}</option>
                                        )):(<option>Not found</option>)}


                                    </select>
                                </div>

                                <div className='form-group my-2'>
                                    <input type="file" id="multipleFiles" multiple name="multipleFiles" onChange={onchange} className="form-control form-control-sm"  />

                                </div>
                                <div className="from-group my-2">
                                    <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>
                                </div>
                            </form>
                        </div>
                        <div className='col-md-12'>
                            <table className='table table-sm table-hover'>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Titel</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Images</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.length>0  ?  products.map((item,index)=>(
                                   <tr key={item.id}>
                                       <td>{index+1}</td>
                                       <td>{item.title}</td>
                                       <td>{item.description}</td>
                                       <td>{item.category.title}</td>
                                       <td>{item.images.map((image,index)=> (<img key={index} src={image.path} alt="image product" width="100" height="50" />))}</td>
                                       <td>
                                           <button onClick={()=>{
                                               onDelete(item.id)
                                           }} type='button' className='btn btn-sm btn-danger'>Delete</button>
                                       </td>
                                   </tr>
                                )):(<></>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Product


