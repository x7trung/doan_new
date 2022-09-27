import React from 'react'
import { Input } from 'antd';
import { IoIosArrowRoundBack } from 'react-icons/io';

const ForgotPassword = ({ setActiveTab }) => {
    return (
        <div>
            <div className='forgot'>

                <div className='acconunt-login'>
                    <div className='account-label'>
                        <label>Nhập tài khoản</label>
                    </div>
                    <div className='account-input'>
                        <Input placeholder="Nhập Email" />
                    </div>
                </div>
                <div className='acconunt-login_btn'>
                    <button>Quên mật khẩu</button>
                </div>
            </div>
            <div onClick={() => setActiveTab(0)} className='signup-btn'>

                <IoIosArrowRoundBack className='signup-btn_icon' />
            </div>
        </div>
    )
}

export default ForgotPassword