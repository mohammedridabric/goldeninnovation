import { Outlet } from 'react-router-dom';
import Navbar from "./Navbar";
import {useSelector} from "react-redux";
function Layout() {
    const {user} = useSelector((state)=> state.auth)

    return (
        <div className="App">
            { user? ( <Navbar/>):''}

            <Outlet/>
        </div>
    )
}

export default Layout
