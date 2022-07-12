import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wrapper from "../components/Wrapper"
import Home from "../page/home/Homepage"
import User from "../page/user/User"
import Order from "../page/oder/OderManage"
import Product from "../page/product"
import TotalIncome from "../page/totalincome/TotalIncome";

const RootRoute = () => {
    return <BrowserRouter>
        <Wrapper>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/user" element={<User />} />
                <Route exact path="/order" element={<Order />} />
                <Route exact path="/product" element={<Product />} />
                <Route exact path="/totalincome" element={<TotalIncome />} />
            </Routes>
        </Wrapper>
    </BrowserRouter>
}

export default RootRoute;