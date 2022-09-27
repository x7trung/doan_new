import React from 'react'
import { Divider } from 'antd';
import moment from 'moment';
const InformationOrder = ({ data }) => {
    console.log(data)
    return (
        <div className='informationorder'>
            <div className='information-address'>
                <Divider orientation="left">Địa chỉ nhận hàng</Divider>
                <h3>Tên người nhận:<span>{data.name}</span></h3>
                <h3>Số điện thoại:<span>{data.phone}</span></h3>
                <h3>Địa chỉ:<span>{data.address}</span></h3>
                <h3>Email:<span>{data.email}</span></h3>
                <h3>Ghi chú:<span>{data.note}</span></h3>

            </div>
            <div className='informationorders-orders'>
                <Divider >Chi tiết đơn hàng</Divider>

                <div>
                    {
                        data.product.map((product) => {
                            return <div className='profileorder-order_content' key={product.id}>
                                <div className='profileorder-ordercontent_item'>
                                    <img src='https://cdn.elly.vn/uploads/2021/09/30224554/6072.jpg' />
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
                <div className='informationorders-orders_title'>
                    <div className='informationorders-bill_receipt'>

                        <h3>Ngày đặt hàng:</h3>
                        <h3>Ngày nhận hàng:</h3>
                        <h3>Tổng tiền hàng:</h3>
                        <h3>Tổng sản phẩm:</h3>
                        <h3>Voucher:</h3>
                        <h3>Phí vận chuyển:</h3>
                        <h3>Đơn vị vận chuyển:</h3>
                        <h3>Phương thức thanh toán:</h3>
                        <h3>Tổng tiền:</h3>


                    </div>
                    <div className='informationorders-bill_receipt'>

                        <h3>{moment(data.oderdate).utc().format('DD/MM/YYYY')}</h3>
                        <h3>{data.receiveddate ? moment(data.receiveddate).utc().format('DD/MM/YYYY') : "chưa nhận"}</h3>
                        <h3>{(data.product.reduce((acc, cur) => {
                            return acc + cur.product_price * cur.product_quantity;
                        }, 0)).toLocaleString()}đ</h3>
                        <h3>{data.product.reduce((acc, cur) => {
                            return acc + cur.product_quantity;
                        }, 0)}</h3>
                        <h3>-{data.voucher}%</h3>
                        <h3>30,000đ</h3>
                        <h3>GHN</h3>
                        <h3>{data.paymenttype}</h3>
                        <h3><span>{(data.product.reduce((acc, cur) => {
                            return acc + cur.product_price * cur.product_quantity;
                        }, 0) * (100 - data.voucher) / 100 + 30000).toLocaleString()}đ</span></h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InformationOrder