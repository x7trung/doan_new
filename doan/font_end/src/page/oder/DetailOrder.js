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
                        <img src={item?.product_image || ""} />
                        <h3>{item?.product_name || ""}</h3>
                    </div>
                    <div className='detail-oder_item oder-item_color'>
                        <h3>Màu sắc:</h3>
                        <div className='oder-item_backgroudcolor' style={{ backgroundColor: item.product_color }}>
                        </div>
                    </div>
                    <div className='detail-oder_item'>
                        <h3>Giá tiền:  {Number(item.product_price).toLocaleString()
                        }đ</h3>
                    </div>
                    <div className='detail-oder_item'>
                        <h3>Số lượng: {item.product_quantity}</h3>
                    </div>
                </div>
            })}
        </div>
    )
}

export default DetailOrder