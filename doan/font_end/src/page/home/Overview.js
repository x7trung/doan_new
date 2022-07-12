import React, { useState } from 'react'
import { MdOutlineMonetizationOn } from 'react-icons/md';
import { BsCartCheck } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiProductHuntLine } from 'react-icons/ri';
import '../../assets/overview.css'
const Overview = () => {
    const [dataview, setDataview] = useState([
        {
            title: "TỔNG THU NHẬP",
            money: "500000000đ",
            view: "Xem thu thâp",
            icon: <div className='card-icon_icon' style={{ color: "rgb(11, 127, 127)", backgroundColor: "rgba(10, 179, 156, .18)" }}>
                <MdOutlineMonetizationOn />
            </div>
        },
        {
            title: "ĐƠN HÀNG",
            money: "5000",
            view: "Xem tất cả đơn hàng",
            icon: <div className='card-icon_icon' style={{ color: "#3577f1", backgroundColor: "rgba(41,156,219,.18)" }}>
                <BsCartCheck />
            </div>,
        },
        {
            title: "KHÁCH HÀNG",
            money: "500",
            view: "xem tất cả khách hàng",
            icon: <div className='card-icon_icon' style={{ color: "#f7b84b", backgroundColor: "RGB(254, 241, 222)" }}>
                <FaRegUserCircle />
            </div>,
        },
        {
            title: "SẢN PHẨM",
            money: "70",
            view: "Xem tất cả sản phẩm",
            icon: <div className='card-icon_icon' style={{ color: "#5d698d", backgroundColor: "RGB(221, 223, 235)" }}>
                <RiProductHuntLine />
            </div>,
        },
    ])
    return (
        <div className='category-map'>
            {
                dataview.map((item, index) => {
                    return <div className='category-card' key={index}>
                        <div className='category-card_title'>
                            <h3>  {item.title}</h3>
                        </div>
                        <div className='category-card_wrapper'>
                            <div className='category-card_income'>
                                <div className='incom_number'>
                                    <h2>{item.money}</h2>
                                </div>
                                <div className='incom_view'>
                                    <h3>{item.view}</h3>
                                </div>
                            </div>
                            <div className='category-card_icon'>
                                {item.icon}
                            </div>
                        </div>

                    </div>
                })
            }
        </div>
    )
}

export default Overview