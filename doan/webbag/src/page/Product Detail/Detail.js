import React, { useState, useContext, useEffect } from 'react'
import '../../assets/css/detail-product.css'
import { Rate } from 'antd';
import { BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../../assets/css/filterbycolor.css'
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import Toast from '../../components/Toast';


const Detail = ({ product }) => {
    const { addToCart } = useContext(CartContext)
    const { auth } = useContext(AuthContext)
    const [activeColor, setActivecolor] = useState(0)
    const [quantity, setQuantity] = useState(1)
    console.log(product)

    const handleAddToCart = () => {
        if (product.detail[activeColor].quantity < quantity) {
            Toast("error", "Đã vượt quá số lượng trong kho")
        } else
            addToCart(auth.id, {
                product_id: product._id, product_color: [...new Set(product.detail.map(i => i.color))][activeColor], product_quantity: quantity, product_price: product.price, product_image: product.image[0].imageUrl, product_name: product.name, product_code: product.product_code, material: product.material, gender: product.gender,like: product.like,
            })
    }

    return (
        <div className='detail'>
            <div className='detail-title'>

                <h2><span>yêu thích</span>{product.name}</h2>
            </div>
            <div className='information'>
                <div className='information-vote'>
                    <h2>{product.rate || 0}</h2>
                    <Rate allowHalf defaultValue={product.rate} disabled />


                </div>
                <div className='information-comment'>
                    <h2>{product.vote}</h2><span>Đánh giá</span>
                </div>
                <div className='information-sold'>
                    <h2>{product.sale}</h2><span>Đã bán</span>

                </div>
            </div>
            <div className='detail-price'>
                {product.discount > 0 && <h2>{product.oldPrice.toLocaleString()}đ</h2>}
                <h1>{product.price ? product.price.toLocaleString() : 0}đ</h1><span>giảm {product.discount}%</span>
            </div>
            <div className='detail-product'>
                <div className='detail-product_bag'>
                    <h2>
                        Thương hiệu:
                    </h2>
                    <h3>
                        {product.nameNCC}
                    </h3>
                </div>
                <div className='detail-product_bag'>
                    <h2>
                        Sản xuất:
                    </h2>
                    <h3>
                        {product.madeIn}
                    </h3>
                </div>
                <div className='detail-product_bag'>
                    <h2>
                        kích cỡ:
                    </h2>
                    <h3>
                        {product.size}
                    </h3>
                </div>
                <div className='detail-product_bag'>
                    <h2>
                        Bảo hành:
                    </h2>
                    <h3>
                        03 tháng (với lỗi do sản xuất).
                    </h3>
                </div>
                <div className='detail-product_bag'>
                    <h2>
                        Tổng số sản phẩm:
                    </h2>
                    <h3>
                        {product.detail && product?.detail.reduce((acc, cur) => { return acc + cur.quantity }, 0)} sản phẩm
                    </h3>
                </div>
                <div className='detail-product_color detail-product_bag'>
                    <h2>
                        Màu sắc:
                    </h2>
                    <div className='detail-color'>
                        {
                            product.detail && [...new Set(product.detail.map(i => i.color))].map((item, index) => {
                                return <div className={`detail-colorfull ${index === activeColor ? "active" : ""}`} style={{ backgroundColor: item }} key={index} onClick={() => setActivecolor(index)}></div>
                            })
                        }
                    </div>
                </div>
                <div className='detail-product_bag'>

                    <h3>
                        Số lượng
                    </h3>
                    <HandleQuantity quantity={quantity} setQuantity={setQuantity} />

                    <h3>
                        {product.detail && product?.detail[activeColor].quantity} sản phẩm có sẵn
                    </h3>
                </div>
                <div className='cart'>
                    <div className='product-cart bycart' onClick={handleAddToCart}>
                        <BsCartPlus className='product-cart_icon' />
                        Thêm Giỏ Hàng
                    </div>
                    <Link to="/pay">
                        <div className='product-buynow bycart'>
                            Mua Ngay
                        </div>
                    </Link>
                </div>

            </div>
            <div className='brand'>
                <h3>Antorro: <span>Túi xách thời trang cao cấp</span> </h3>
            </div>
        </div>
    )
}

export default Detail

const HandleQuantity = ({ setQuantity, quantity }) => {
    const checkNagativeNumber = (number) => {
        if (number < 0) return 0
        else return number
    }
    return <div className='product-bag_number'>
        <div className='number-item' onClick={() => setQuantity(pre => pre - 1)}>
            -
        </div>
        <div className='number-item'>
            {checkNagativeNumber(quantity)}
        </div>

        <div className='number-item' onClick={() => setQuantity(pre => pre + 1)}>
            +
        </div>
    </div >
}