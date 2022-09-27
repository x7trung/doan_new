import React, { useState, useContext, useEffect } from 'react'
import '../../assets/css/cart.css'
import { Checkbox, Divider, Col, Row, Affix } from "antd";
import CartItem from "./CartItem";
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Toast from '../../components/Toast';

const Cart = () => {
    const { cartState, totalCart, removeAllCart } = useContext(CartContext)
    let navigation = useNavigate()

    const handleByNow = () => {
        if (cartState.cartIdChecked.length == 0) {
            Toast("warn", "Giỏ hàng đang trống")
        } else {
            navigation("/pay")
        }
    }
    return (
        <div className='bycart-product'>

            <div className="cart-left">
                <h1>GIỎ HÀNG ({cartState.amount} sản phẩm)</h1>
                {/* <CheckAll /> */}
                <CheckAll cartState={cartState.cart} totalCart={totalCart} />
            </div>
            <Affix offsetBottom={0} >

                <div className='cart-pay'>

                    <div className='cart-pay_item' onClick={removeAllCart}>
                        <h3>Xoá</h3>
                    </div>

                    <div className='cart-pay_itembtn'>
                        <div className='cart-pay_item'>
                            <h3>Tổng thanh toán({cartState.cart ? cartState.cart.filter((i) => cartState.cartIdChecked.includes(i.id)).reduce((acc, cur) => { return acc + cur.product_quantity }, 0) : 0} sản phẩm): <span>{cartState.totalCart ? cartState.totalCart.toLocaleString() : 0}đ</span></h3>
                        </div>


                        <button onClick={handleByNow}>Mua ngay</button>

                    </div>
                </div>
            </Affix>
        </div>


    )
}

export default Cart




const CheckAll = ({ cartState, totalCart }) => {
    const [checkedList, setCheckedList] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    // const plainOptions = [1, 2, 3, 4, 5]
    const plainOptions = cartState?.map((item) => item.id);
    useEffect(() => {
        totalCart(checkedList);
    }, [checkedList]);

    const onChange = (list) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return (
        <>
            <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
                options={plainOptions}
            >
                Chọn tất cả sản phẩm
            </Checkbox>
            <Divider />

            <Checkbox.Group
                style={{
                    width: "100%",
                }}
                // options={plainOptions}
                value={checkedList}
                onChange={onChange}
            >
                <Row>
                    {cartState && cartState.map((item, index) => {
                        return (
                            <Col span={24} key={index}>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 15fr",
                                        width: "100%",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Checkbox
                                            value={item.id}
                                            style={{ width: 20 }}
                                            checked={true}
                                        />
                                    </div>
                                    <CartItem
                                        item={item}
                                        checkedList={checkedList}
                                        totalCart={totalCart}
                                    />
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Checkbox.Group>
        </>

    );
};