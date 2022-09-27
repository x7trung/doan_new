import React, { useState } from 'react'
import { Input } from 'antd';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Toast from "./Toast"
import Auth from '../services/authServices';


const Signup = ({ setActiveTab }) => {
    const [signupForm, setSignupForm] = useState({
        name: "",
        role: 1,
        confirmPassword: "",
        password: "",
        email: "",
        address: "",
        phone: ''
    })

    const handleRegister = async () => {
        try {
            const { confirmPassword, ...rest } = signupForm
            if (signupForm.password !== signupForm.confirmPassword) {
                Toast("error", "Mật khẩu không trùng khớp")
                return
            }
            await Auth.register(rest)
            Toast("success", "Đăng ký thành công")
        } catch (error) {
            Toast("error", "Đăng ký thất bại")
        }
    }



    return (
        <div>
            <div className='signup'>
                <div className='acconunt-login'>
                    <div className='account-label'>
                        <label>Họ và tên</label>
                    </div>
                    <div className='account-input'>
                        <Input placeholder="Nhập họ tên" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} />
                    </div>
                </div>
                <div className='acconunt-login'>
                    <div className='account-label' >
                        <label>Địa chỉ</label>
                    </div>
                    <div className='account-input'>
                        <Input placeholder="Nhập địa chỉ" value={signupForm.address} onChange={(e) => setSignupForm({ ...signupForm, address: e.target.value })} />
                    </div>
                </div>
                <div className='acconunt-login'>
                    <div className='account-label'>
                        <label>Số điện thoại</label>
                    </div>
                    <div className='account-input'>
                        <Input placeholder="Nhập số điện thoại" value={signupForm.phone} onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })} />
                    </div>
                </div>
                <div className='acconunt-login'>
                    <div className='account-label'>
                        <label>Email đăng nhập</label>
                    </div>
                    <div className='account-input'>
                        <Input placeholder="Nhập Email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} />
                    </div>
                </div>
                <div className='acconunt-login'>
                    <div className='account-label'>
                        <label>Mật khẩu</label>
                    </div>
                    <div className='account-input'>
                        <Input placeholder="Nhập mật khẩu" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} />
                    </div>
                </div>
                <div className='acconunt-login'>
                    <div className='account-label'>
                        <label>Nhập lại mật khẩu</label>
                    </div>
                    <div className='account-input'>
                        <Input placeholder="Nhập lại mật khẩu" value={signupForm.confirmPassword} onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })} />
                    </div>
                </div>
                <div className='acconunt-login_btn'>
                    <button onClick={handleRegister}>Đăng ký</button>
                </div>
            </div>
            <div onClick={() => setActiveTab(0)} className='signup-btn'>

                <IoIosArrowRoundBack className='signup-btn_icon' />
            </div>
        </div>
    )
}

export default Signup