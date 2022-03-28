import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, register, reset} from '../../features/auth/authSlice'

function Login() {
    const [formData,setFormData]=useState({
        email:'',
        password:''
    });

    const  {email,password} = formData;

    const navigate = useNavigate()
    const dispatch =useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )
    useEffect(()=>{
        if (isError){
            toast.error(message)
        }
        if (isSuccess || user ){
            navigate('/')
        }
        dispatch(reset())
    },[user,isError,isSuccess,message,navigate,dispatch])

    const onchange =(e)=>{
        setFormData((prevState)=>({
            ...prevState,[e.target.name]:e.target.value
        }))
    };

    const onSubmit =(e)=>{
        e.preventDefault();
        const userData = {
            email,password
        }
        dispatch(login(userData))
    };



    return (
        <>
            <div className="container">
                <form onSubmit={onSubmit} className="mx-auto my-5 p-4 w-50"  >
                    <h1 className="h3 mb-3 fw-normal text-center m-2">Login</h1>

                    <div className='form-group my-2'>
                        <input value={email} name='email' onChange={onchange}  type="email" className="form-control" placeholder="Email address" required/>
                    </div>
                    <div className='from-group my-2'>
                        <input value={password} name='password' onChange={onchange}  type="password" className="form-control" placeholder="Password" required/>
                    </div>
                    <div className="from-group my-2">
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login


