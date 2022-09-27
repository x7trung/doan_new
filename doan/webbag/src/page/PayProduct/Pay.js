import React, { useState, useContext, useEffect } from 'react'
import PaymentProducts from './PaymentProducts'
import ProductPay from './ProductPay'
import { Radio, Affix, Button, Modal } from 'antd';
import { FcApproval } from 'react-icons/fc';
import { CartContext } from '../../context/CartContext';
import Users from '../../services/userServices';
import Toast from '../../components/Toast';
import { AuthContext } from '../../context/AuthContext';
import VnPay from './Vnpay';
import queryString from "query-string";
import {
    LOCAL_STORAGE_CART_KEY,
    LOCAL_STORAGE_ORDER_KEY,
} from "../../constant/constant";
import { useNavigate } from 'react-router-dom';
import Voucher from './Voucher';


const Pay = () => {
    const [activePay, setActivePay] = useState(0)
    let navigate = useNavigate()
    const { cartState, payment } = useContext(CartContext)
    const { auth } = useContext(AuthContext)
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [note, setNote] = useState("")
    const [value, setValue] = useState("offline");
    const [selectVoucher, setSelectVoucher] = useState(0)
    useEffect(() => {
        const sumQuery = queryString.parse(window.location.search);
        if (JSON.stringify(sumQuery) !== JSON.stringify({})) {
            if (sumQuery.vnp_ResponseCode == "00") {
                handlePayment("online")
                Toast("success", "Thanh toán thành công");
            } else {
                Toast("error", "Thanh toán thất bại");
            }
        }
    }, []);
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await Users.getUser(auth.id)
                setName(data.name);
                setPhone(data.phone);
                setEmail(data.email);
                setAddress(data.address);

            } catch (error) {
                Toast("error", error.message)
            }
        }
        getUser()
    }, [])

    const storeOrder = () => {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify({

            name, phone, email, address, note, product: [...cartState.cart.filter((i) => cartState.cartIdChecked.includes(i.id))],
            paymenttype
                : value, voucher: selectVoucher, ship: 30000, state: "Chờ xác nhận"
        }))
    }

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const handlePayment = async (type) => {

        try {
            if (type == "offline") {
                await Users.order(auth.id, {

                    name, phone, email, address, note, product: [...cartState.cart.filter((i) => cartState.cartIdChecked.includes(i.id))],
                    paymenttype
                        : value, voucher: selectVoucher, ship: 30000, state: "Chờ xác nhận"
                })
                payment([...cartState.cart.filter((i) => cartState.cartIdChecked.includes(i.id))].map(i => i.id))
                setVisible(true)
            } else {
                const orderStore = JSON.parse(
                    localStorage.getItem(LOCAL_STORAGE_CART_KEY)
                )
                await Users.order(auth.id, orderStore)
                payment(orderStore.product.map(i => i.id))
                localStorage.removeItem(LOCAL_STORAGE_CART_KEY)
                navigate("/pay")
                setVisible(true)
                window.location.reload();

            }

        } catch (error) {
            Toast("error", error.message)
        }

    }
    return (
        <div className='pay'>

            <PaymentProducts name={name} setName={setName} phone={phone} setPhone={setPhone} email={email} setEmail={setEmail} address={address} setAddress={setAddress} note={note} setNote={setNote} />
            <div style={{ transition: "all .5s linear" }}>

                {
                    cartState.cart.filter((i) => cartState.cartIdChecked.includes(i.id)).map((item, index) => {
                        return <div key={index}>
                            <ProductPay dataPay={item} />
                        </div>
                    })
                }
            </div>


            <div className='payall-product'>
                <div className='payall-product_header'>
                    <div>

                        <div className='payall-payments'>
                            <h2>Phương thức thanh toán</h2>
                            <div className='payall-payments_item'>
                                <Radio.Group size="large" onChange={onChange} value={value}>
                                    <Radio.Button value="offline" className='payall-item_rdo' onClick={() => setActivePay(0)} style={{ color: activePay === 0 && "red", borderColor: activePay === 0 && "red" }}>Thanh toán tiền mặt</Radio.Button>
                                    <Radio.Button value="online" className='payall-item_rdo' onClick={() => setActivePay(1)} style={{ color: activePay === 1 && "red", borderColor: activePay === 1 && "red" }}>Thanh toán chuyển khoản</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                    <div className='payall-product_header_voucher'>
                        <Voucher selectVoucher={selectVoucher} setSelectVoucher={setSelectVoucher} totalCart={cartState.totalCart} />
                    </div>
                </div>
                <div className='payall-Bill'>
                    <div className='payall-bill_receipt'>
                        <h3>Tổng tiền hàng</h3>
                        <h3>Tổng sản phẩm</h3>
                        <h3>Phí vận chuyển</h3>

                    </div>
                    <div className='payall-bill_receipt'>
                        <h3>{cartState.totalCart.toLocaleString()}đ</h3>
                        <h3>{cartState.cart.filter((i) => cartState.cartIdChecked.includes(i.id)).reduce((acc, cur) => { return acc + cur.product_quantity }, 0)}</h3>
                        <h3>30,000đ</h3>

                    </div>
                </div>
                <Affix offsetBottom={0} onChange={(affixed) => console.log(affixed)}>
                    <div className='payall-bill_btn'>
                        <div className='payall-bill_total'>
                            <h2><span>Tổng thanh toán: </span> {((cartState.cart.filter((i) => cartState.cartIdChecked.includes(i.id)).reduce((acc, cur) => { return acc + cur.product_quantity * cur.product_price }, 0) * (100 - selectVoucher) / 100) + 30000).toLocaleString()}đ</h2>
                        </div>
                        <div className='payall-bill_item'>
                            <>
                                {activePay == 0 ? <button onClick={() => handlePayment("offline")}>Đặt hàng</button> : <VnPay monney={cartState.totalCart * (100 - selectVoucher) / 100 + 30000} storeOrder={storeOrder} />}


                                <Modal
                                    title=""
                                    centered
                                    visible={visible}
                                    onOk={() => setVisible(false)}
                                    onCancel={() => setVisible(false)}
                                    width={1000}
                                    footer={null}
                                    closable={false}
                                >
                                    <div className='pay-successful'>
                                        <FcApproval className='pay-successful_icon' />
                                        <h2>Đặt hàng thành công</h2>
                                    </div>
                                </Modal>
                            </>

                        </div>
                    </div>
                </Affix>
            </div>
        </div>
    )
}

export default Pay