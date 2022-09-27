import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "../components/Header";
import Home from "../page/Home/Home";
import Footer from "../components/Footer"
import ProductList from "../page/Product List";
import ProductDetail from "../page/Product Detail/ProductDetai"
import Cart from '../page/Cart/Cart'
import User from "../page/User/User";
import Pay from "../page/PayProduct/Pay";
const RootRoute = () => {
    return <BrowserRouter>

        <Header />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User />} />
            <Route path="/pay" element={<Pay />} />
        </Routes>
        <Footer />
    </BrowserRouter>
}

export default RootRoute;