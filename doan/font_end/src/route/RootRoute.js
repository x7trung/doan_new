import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wrapper from "../components/Wrapper"
import Home from "../page/home/Homepage"
import User from "../page/user/User"
import Order from "../page/oder/OderManage"
import Product from "../page/product"
import TotalIncome from "../page/totalincome/TotalIncome";
import Stock from "../page/stock";
import NCC from "../page/NCC"
import Admin from "../page/admin"
const RootRoute = () => {
    return <BrowserRouter>
        <Wrapper>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/user" element={<User />} />
                <Route path="/order" element={<Order />} />
                <Route path="/product" element={<Product />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/NCC" element={<NCC />} />
                <Route path="/admin" element={<Admin />} />

            </Routes>
        </Wrapper>
    </BrowserRouter>
}

export default RootRoute;