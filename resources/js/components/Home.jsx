import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import "@popperjs/core";
import "bootstrap";
function Home() {
    const navigate = useNavigate()

    const {user} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    },[user,navigate])

    return (
      <>
          <h1 className='text-center '>Home</h1>
      </>
    );
}

export default Home;

