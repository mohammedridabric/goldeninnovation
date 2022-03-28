import React, {useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import {categorystore, getCategory} from "../../features/category/categorySlice";

function Category() {
    const [title,setTitle]=useState('')

    const { categories , isError     , isSuccess   , isLoading   , message    } = useSelector((state => state.category))
    const dispatch = useDispatch()


    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(categorystore({title}))
        setTitle('')
    }
    useEffect(()=>{
        if (isError){
            console.log(message)
        }
        dispatch(getCategory())

    },[isError,message,dispatch])

    return (
        <>
            <div className='container-fluid m-auto text-center'>
                    <form onSubmit={onSubmit} className="mx-auto my-5 p-4 w-50"  >
                        <h1 className="h3 mb-3 fw-normal text-center m-2">New Category</h1>

                        <div className='form-group my-2'>
                            <input value={title} name='title' onChange={(e)=>{setTitle(e.target.value)}}  type="text" className="form-control" placeholder="Add  Category Title" required/>
                        </div>
                        <div className="from-group my-2">
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>
                        </div>
                    </form>
                    <div className='my-auto text-center row' >
                        <div className='col-12'>
                            {categories.length>0  ?  categories.map((item)=>(
                                <h4 className='text-center ' key={item.id}>{item.title}</h4>
                            )):(<span>Not found</span>)}
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Category


