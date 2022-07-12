import React, { useState } from 'react'
import '../../assets/detailoder.css'
const DetailOrder = ({ product }) => {
    const [data, setData] = useState([
        {
            img: "https://cdn.elly.vn/uploads/2017/12/26225903/tui-xach-nu-thoi-trang-cao-cap-elly-el95-3-3-300x300.jpghttps://cdn.elly.vn/uploads/2017/12/26225903/tui-xach-nu-thoi-trang-cao-cap-elly-el95-3-3-300x300.jpg",
            name: "Túi xách nữ, Túi kẹp nách nữ thời trang da vân cá sấu style phong cách Hàn Quốc TX005",
            color: "Màu sắc:Màu đen",
            price: "Đơn giá: 7,999,000đ",
            amount: "Số lượng: 2",
        },
        {
            img: "https://cdn.elly.vn/uploads/2017/12/26225903/tui-xach-nu-thoi-trang-cao-cap-elly-el95-3-3-300x300.jpghttps://cdn.elly.vn/uploads/2017/12/26225903/tui-xach-nu-thoi-trang-cao-cap-elly-el95-3-3-300x300.jpg",
            name: "Túi xách nữ, Túi kẹp nách nữ thời trang da vân cá sấu style phong cách Hàn Quốc TX005",
            color: "Màu sắc:Màu đen",
            price: "Đơn giá: 7,999,000đ",
            amount: "Số lượng: 2",
        },
        {
            img: "https://cdn.elly.vn/uploads/2017/12/26225903/tui-xach-nu-thoi-trang-cao-cap-elly-el95-3-3-300x300.jpghttps://cdn.elly.vn/uploads/2017/12/26225903/tui-xach-nu-thoi-trang-cao-cap-elly-el95-3-3-300x300.jpg",
            name: "Túi xách nữ, Túi kẹp nách nữ thời trang da vân cá sấu style phong cách Hàn Quốc TX005",
            color: "Màu sắc:Màu đen",
            price: "Đơn giá: 7,999,000đ",
            amount: "Số lượng: 2",
        },
    ])
    return (
        <div>
            {product.map((item, index) => {
                return <div className='detail-oder' key={index}>
                    <div className='detail-oder_img'>
                        <img src={item?.img || ""} />
                        <h3>{item?.name || ""}</h3>
                    </div>
                    <div className='detail-oder_item'>
                        <h3>{item.color}</h3>
                    </div>
                    <div className='detail-oder_item'>
                        <h3>{item.price}</h3>
                    </div>
                    <div className='detail-oder_item'>
                        <h3>{item.quantity}</h3>
                    </div>
                </div>
            })}
        </div>
    )
}

export default DetailOrder