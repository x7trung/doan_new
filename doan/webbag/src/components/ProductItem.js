import React, { useContext, useState } from 'react'
import { TiShoppingCart } from 'react-icons/ti';
import { AiOutlineEye } from 'react-icons/ai';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FcLike } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Toast from './Toast';

const ProductItem = ({ data, noLike }) => {
    const [show, setShow] = useState(false)
    const [activeColor, setActivecolor] = useState(0)
    const { addToCart } = useContext(CartContext)
    const { auth } = useContext(AuthContext)


    const handleAddToCart = () => {

        if (data.detail[activeColor].quantity < 1) {
            Toast("error", "Đã vượt quá số lượng trong kho")
        } else
            addToCart(auth.id, {
                product_id: data._id, product_color: [...new Set(data.detail.map(i => i.color))][activeColor], product_quantity: 1, product_price: data.price, product_image: data.image, product_name: data.name, product_code: data.product_code, material: data.material, gender: data.gender,like:data.like,
            })
        setShow(!show)
    }



    return (

        <>

            <div className="sale-product">
                <Badge.Ribbon text='sale'
                    // {`-${data.discount}%`} 
                    color="black" style={{ zIndex: 5, display: data.discount == 0 ? "none" : "block" }} placement="start">
                    <div className="product-img">
                        <Link to={"/product-detail/" + data._id}>

                            <img src={data.image} className="img-before" />
                            <img src={data.imageBh} className="img-after" />

                        </Link>
                        <div className="sale-product_btn">
                            <div className="product-img_btn" onClick={() => setShow(!show)}>
                                <TiShoppingCart />
                                Thêm vào giỏ
                            </div>
                            <Link to={`/product-detail/${data._id}`} style={{ display: "block", color: "#000", listStyle: "none", width: "100%" }}>
                                <div className="product-img_btn">
                                    <AiOutlineEye />
                                    xem chi tiết
                                </div>
                            </Link>
                        </div>
                        <div className={`product-fastSale ${show ? "show" : ""}`}>
                            <div className="product-fastSale_icon">

                                <IoIosCloseCircleOutline onClick={() => setShow(!show)} />
                            </div>
                            <div className='detail-product_color detail-product_bag detail-product-cart_item'>
                                <h2>
                                    Màu sắc:
                                </h2>
                                <div className='detail-color'>
                                    {
                                        data.detail && [...new Set(data.detail.map(i => i.color))].map((item, index) => {
                                            return <div className={`detail-colorfull ${index === activeColor ? "active" : ""}`} style={{ backgroundColor: item }} key={index} onClick={() => setActivecolor(index)}></div>
                                        })
                                    }
                                </div>
                            </div>
                            <div onClick={handleAddToCart} className='detail-color_butons'> <button className='btn_color-cart'>thêm vào giỏ</button></div>
                        </div>
                    </div>
                </Badge.Ribbon>


                <Link to={`/product-detail/${data._id}`}>
                    <div className="sale-title">
                        <h4 className="sale-title_name">{data.name.slice(0, 50) + '...'}</h4>
                        {data.stock == 0 ? <p > HẾT HÀNG</p> : <>
                            <div className='sale-title-item '>
                                {noLike ? null : <div></div>}
                                {noLike ? null : <div></div>}


                                <h4 className="sale-title_classify " >{data.category}</h4>
                                {noLike ? null : <div className="sale-title_love"><FcLike />Đã thích({data.like})</div>}

                            </div>

                            <div className="sale-price">

                                <div className="sale-title_price">
                                    {data.discount > 0 && <h3 className="price-reduce" >{data.oldPrice.toLocaleString()}đ</h3>}
                                    <h3 className=" price-notreduce">{data.price.toLocaleString()}đ</h3>
                                </div>
                                <div className="sale-title_sold">
                                    <h5>Đã bán {data.sold} </h5>

                                </div>
                            </div>
                        </>}

                    </div>
                </Link>

            </div >
        </>

    )
}

export default ProductItem