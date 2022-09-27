import React, { useState, useContext } from 'react'
import { Checkbox, Divider } from 'antd';
import { BsFacebook } from 'react-icons/bs';
import { Input } from 'antd';
import { FcGoogle } from 'react-icons/fc';
import '../assets/css/header.css'
import { Link } from 'react-router-dom';
import {
    AiFillApple,
} from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Auth from "../services/authServices";
import { LOCAL_STORAGE_USER_KEY } from "../constant/constant";
import Toast from './Toast';

// import Toast from "../components/";





const Login = ({ setActiveTab, setVisible }) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuth } = useContext(AuthContext);




    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onLogin = async () => {
        try {
            const res = await Auth.login({ email, password });

            if (res.data.data.role == 2) {
                window.location = 'http://localhost:3000/';

            }
            setAuth(res.data.data);
            localStorage.setItem(
                LOCAL_STORAGE_USER_KEY,
                JSON.stringify(res.data.data)
            );
            Toast("success", "đăng nhập thành công");
            setVisible(false)

        } catch (error) {
            Toast("error", "đăng nhập thất bại");
        }
    };




    return (

        <div>
            <>

                <div className='account'>
                    <div className='acconunt-login'>
                        <div className='account-label'>
                            <label>Đăng nhập bằng địa chỉ Email</label>
                        </div>
                        <div className='account-input'>
                            <Input placeholder="Nhập tài khoản email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className='acconunt-login'>
                        <div className='account-label'>
                            <label>Mật khẩu</label>
                        </div>
                        <div className='account-input'>
                            <Input.Password placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='acconunt-login'>
                        <Checkbox onChange={onChange}>Nhớ mật khẩu</Checkbox>
                    </div>


                    <div className='acconunt-login_btn'>
                        <button onClick={onLogin}> Đăng nhập</button>

                    </div>

                    <div className='acconunt-login_title'>
                        <h3 onClick={() => setActiveTab(2)}>Quên mật khẩu ?</h3>
                        <h3 onClick={() => setActiveTab(1)}><span>Bạn mới đến shop Antorro? </span>đăng ký</h3>
                    </div>
                    <div className='login-rim'>

                        <Divider>Hoặc</Divider>
                    </div>
                    <div className='login-google_wrapper'>

                        <div className='login-google'>
                            <BsFacebook className='login-fb_icon' />
                            <h3>Facebook</h3>
                        </div>
                        <div className='login-google'>
                            <FcGoogle />
                            <h3>Google</h3>
                        </div>
                        <div className='login-google'>
                            <AiFillApple />
                            <h3>Apple</h3>
                        </div>
                    </div>


                </div>

            </>
        </div>
    )
}

export default Login