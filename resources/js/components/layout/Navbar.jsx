import {NavLink,Link,useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {logout,reset} from "../features/auth/authSlice";

function Navbar() {
    const navigate =useNavigate()
    const dispatch =useDispatch()
    const {user} = useSelector((state)=> state.auth)
    const onLogout =()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <NavLink exact="true" activeclassname="active"  className="navbar-brand" to="/">Golden Innovation</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink  exact="true" activeclassname="active" to="/" className="nav-link ">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a   className="nav-link dropdown-toggle" data-bs-toggle="dropdown"  role="button"
                                    aria-haspopup="true" aria-expanded="false">Products</a>
                                <div className="dropdown-menu">
                                    <NavLink to="/product"   activeclassname="active" className="dropdown-item" >New Product</NavLink>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a   className="nav-link dropdown-toggle" data-bs-toggle="dropdown"  role="button"
                                     aria-haspopup="true" aria-expanded="false">Categories</a>
                                <div className="dropdown-menu">
                                    <NavLink to="/category"   activeclassname="active" className="dropdown-item" >New Category</NavLink>
                                </div>
                            </li>
                        </ul>
                        <div>
                            {user ? (<button to="/logout"  className="mx-1 btn btn-sm " onClick={onLogout}  >Logout</button>) : (<><Link to="/register"    className="mx-1" >Register</Link>
                                <Link to="/login"    className="mx-1" >Login</Link></>)}

                        </div>
                    </div>



                </div>
            </nav>
        </>
    )
}

export default Navbar
