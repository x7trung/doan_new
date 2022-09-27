import React, { useState } from 'react'
import '../../assets/css/paymentproducts.css'
import { Input } from 'antd';
import { FaMapMarkerAlt } from 'react-icons/fa';


const PaymentProducts = ({ name, setName, phone, setPhone, email, setEmail, address, setAddress, note, setNote }) => {
    const [displayAdd, setDisplayAdd] = useState(false)

    return (
        <div >
            <div className={`payment ${displayAdd && "expand"}`}>
                ,<div className='payment-title_window'>

                    <div className='payment-title'>
                        <FaMapMarkerAlt />
                        <h2>Địa chỉ nhận hàng</h2>
                    </div>
                    <button onClick={() => setDisplayAdd(!displayAdd)}>{!displayAdd ? "Đóng" : "Điền thông tin"}</button>
                </div>
                <div className='payment-content' style={{ display: displayAdd ? "none" : "block" }}>

                    <div className='payment-label'>
                        <label>Nhập họ tên</label>
                    </div>
                    <div className='payment-input'>
                        <Input placeholder="Nhập họ tên" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className='payment-content' style={{ display: displayAdd ? "none" : "block" }}>

                    <div className='payment-label'>
                        <label>Số điện thoại</label>
                    </div>
                    <div className='payment-input'>
                        <Input placeholder="Nhập số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </div>
                <div className='payment-content' style={{ display: displayAdd ? "none" : "block" }}>

                    <div className='payment-label'>
                        <label>Nhập Email</label>
                    </div>
                    <div className='payment-input'>
                        <Input placeholder="Nhập Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className='payment-content' style={{ display: displayAdd ? "none" : "block" }}>

                    <div className='payment-label'>
                        <label>Nhập địa chỉ</label>
                    </div>
                    <div className='payment-input'>
                        <Input placeholder="Nhập địa chỉ nhận hàng" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>
                <div className='payment-content' style={{ display: displayAdd ? "none" : "block" }}>

                    <div className='payment-label'>
                        <label>Ghi chú</label>
                    </div>
                    <div className='payment-input'>
                        <Input placeholder="Quý khách vui lòng thêm yêu cầu về sản phẩm, vận chuyển " value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PaymentProducts