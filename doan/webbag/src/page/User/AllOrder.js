import React, { useState } from 'react'
import Toast from '../../components/Toast'
import ModelOrder from './ModelOrder'
import userServices from '../../services/userServices'

const AllOrder = ({ data, setData }) => {

    const cancelOrders = async (id) => {
        try {
            await userServices.cancelOrders(id, { state: "Huỷ hàng" })
            setData(data.map(item => {
                if (item._id == id) {
                    return { ...item, state: "Huỷ hàng" }
                } else return item
            }))
            Toast("success", "Huỷ đơn hàng thành công")
        } catch (error) {
            Toast("error", error.message)
        }
    }


    return (
        <div>
            {
                data.map((item, index) => {
                    return <div className='profileorder-order' key={index}>
                        <div className='profileorder-order_title'>
                            <div className='profileorder-order_h4'>
                                Trạng thái đơn hàng
                            </div>
                            <div className='profileorder-order_item'>
                                <div className='profileorder-order_state'>
                                    <h3>{item.state.toUpperCase()}</h3>
                                </div>
                                <ModelOrder data={item} />
                            </div>
                        </div>
                        <div>
                            {
                                item.product.map((product) => {
                                    return <div className='profileorder-order_content' key={product.id}>
                                        <div className='profileorder-ordercontent_item'>
                                            <img src={product.product_image} />
                                            <div className='profileorder-ordercontent_item_information'>
                                                <h3>{product.product_name}</h3>
                                                <h4><span>Màu sắc: {product.product_color}</span></h4>
                                                <h4>x{product.product_quantity}</h4>
                                            </div>
                                            <div className='profileorder-ordercontent_item_price'>
                                                <h3>{product.product_price.toLocaleString()}đ</h3>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }

                        </div>

                        <div className='profileorder-ordercontent_information'>
                            <div className='profileorder-ordercontent_information_price'>
                                <h3>Tổng tiền:<span>{(item.product.reduce((acc, cur) => {
                                    return acc + cur.product_price * cur.product_quantity;
                                }, 0) * (100 - item.voucher) / 100 + 30000).toLocaleString()}đ</span></h3>
                            </div>
                            <div className='profileorder-ordercontent_information_wrapper'>
                                {item.state == "Chờ xác nhận" ? <button className='profileorder-ordercontent_information-btn2' onClick={() => cancelOrders(item._id)}>huỷ</button> : item.state == "Giao hàng thành công" || item.state == "Huỷ hàng" ? <button className='profileorder-ordercontent_information-btn1'>Mua lại</button> : null}


                            </div>
                        </div>
                    </div>
                })
            }

        </div>

    )
}

export default AllOrder