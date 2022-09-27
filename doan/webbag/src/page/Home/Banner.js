
import 'swiper/css';
import '../../assets/css/banner.css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useRef, useState } from "react";

import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

const Banner = () => {

    return (

        <div style={{ marginTop: 140 }}>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"

            >
                <SwiperSlide><img src="https://cdn.elly.vn/uploads/2021/06/21170126/cover-premium-x2-02-1024x405.jpg" className="banner-slide" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.elly.vn/uploads/2022/05/26142154/Web_1920x780-nen.jpg" className="banner-slide" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.elly.vn/uploads/2022/05/24120144/1024x416-1.jpg" className="banner-slide" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.elly.vn/uploads/2022/03/25120618/web-1-1024x416.jpg" className="banner-slide" /></SwiperSlide>
            </Swiper>

        </div>



    )
}


export default Banner



