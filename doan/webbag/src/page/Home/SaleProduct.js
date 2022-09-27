
import '../../assets/css/saleproduct.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useState } from "react";
import { GrFormNext } from 'react-icons/gr';
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ProductItem from '../../components/ProductItem';
import { Link } from 'react-router-dom';
const SaleProduct = ({ data, title, desc, findBy, noLike }) => {

    return (
        <div className='sale-byproducttop'>
            <div className="sale-top">

                <h2>{title}</h2>
                <h4>{desc}</h4>
            </div>
            <div className="sale">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation={true}
                    loop={true}
                    modules={[Navigation]}
                    className="mySwiperProduct"
                >
                    {
                        data && data.map((item, index) => {
                            return <SwiperSlide key={index}>
                                <ProductItem data={item} noLike={noLike} />
                            </SwiperSlide>
                        })
                    }
                </Swiper>






            </div>
            <Link to={"/product-list?list=0&search=" + findBy}>
                <div className="sale-viewall">
                    <h4>Xem tất cả</h4>
                    <div className="sale-icon">

                        <GrFormNext />
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default SaleProduct