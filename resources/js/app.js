import './app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/layout/Layout';
import Home from './components/Home';
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Category from "./components/pages/category/Category";
import Product from "./components/pages/product/Product";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route  element={<Layout/>}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/category' element={<Category />} />
                    <Route path='/product' element={<Product />} />
                </Route>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('app')
);

