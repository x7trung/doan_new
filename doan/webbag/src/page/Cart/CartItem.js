import React, { useState, useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { MdDeleteForever } from 'react-icons/md';

const CartItem = ({ item, totalCart, checkedList }) => {
    const { increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext)
    const [quantity, setQuantity] = useState(item.product_quantity)
    return (
        <div className='cart-list_product'>
            <div className='cart-list_img'>
                <img src={item.product_image} />

                <h3>{item.product_name}</h3>

            </div>
            <div className='cart-list_item cart-listcolor_item'>
                <h3>Màu sắc:</h3>
                <div className='cart-list_item_backgroudcolor' style={{ backgroundColor: item.product_color }}>
                </div>
            </div>

            <div className='cart-list_item'>
                <h2>{item.product_price.toLocaleString()}đ</h2>
            </div>
            <div className='cart-list_item'>
                <HandleQuantity quantity={quantity} setQuantity={setQuantity} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} item={item} totalCart={totalCart} checkedList={checkedList} />
            </div>
            <div className='cart-list_item cart-list_item-icon' onClick={() => { removeFromCart(item); totalCart(checkedList) }}>
                <MdDeleteForever />
            </div>
        </div>
    )
}

export default CartItem


const HandleQuantity = ({ setQuantity, quantity, increaseQuantity, decreaseQuantity, item, totalCart, checkedList }) => {
    const checkNagativeNumber = (number) => {
        if (number < 0) return 0
        else return number
    }
    return <div className='product-bag_number'>
        <div className='number-item' onClick={async () => { setQuantity(pre => pre - 1); await decreaseQuantity(item); await totalCart(checkedList) }}>
            -
        </div>
        <div className='number-item'>
            {checkNagativeNumber(quantity)}
        </div>

        <div className='number-item' onClick={async () => { setQuantity(pre => pre + 1); await increaseQuantity(item); await totalCart(checkedList) }}>
            +
        </div>
    </div >
}