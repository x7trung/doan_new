import React, { useState } from 'react'
import '../../assets/css/productpay.css'



const ProductPay = ({ dataPay }) => {


    return (
        <>

            <div className='product-pay'>


                <div className='productpay-list_img'>
                    <img src={dataPay.product_image} />

                    <h3>{dataPay.product_name}</h3>

                </div>
                <div className='productpay_item productpay-color_item'>
                    <h3>Màu sắc:</h3>
                    <div className='productpay_item_backgroudcolor' style={{ backgroundColor: dataPay.product_color }}>
                    </div>
                </div>

                <div className='productpay_item'>
                    <div className='productpay-bag_number'>
                        {dataPay.product_quantity}
                    </div>
                </div>
                <div className='productpay_item'>
                    <h2>{dataPay.product_price.toLocaleString()}đ</h2>
                </div>

            </div>

        </>
    )
}

export default ProductPay