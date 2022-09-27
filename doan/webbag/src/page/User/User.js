import React, { useState, useContext, Profiler } from 'react'
import '../../assets/css/user.css'
import { AiOutlineUser } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import Auth from '../../services/authServices';
import Profile from './Profile';
import ProfileAccount from './ProfileAccount';
import Toast from '../../components/Toast';
import { AuthContext } from '../../context/AuthContext';
import ProfileOrder from './ProfileOrder';
import ProfileLike from './ProfileLike';
import { useNavigate } from 'react-router-dom';

const switchTab = (index) => {
    switch (index) {
        case 0:
            return <Profile />
        case 1:
            return <ProfileOrder />
        case 2:
            return <ProfileLike />
        case 3:
            return <ProfileAccount />
        default:
            return null
    }
}

const User = () => {
    const { setAuth } = useContext(AuthContext)
    const [activeTab, setActiveTab] = useState(0)
    let navigate = useNavigate()
    const [userItem, setUserItem] = useState([
        {
            title: "Thông tin của tôi",
            icon: null,
            function: () => { }
        },
        {
            title: "Đơn mua",
            icon: null,
            function: () => { }
        },
        {
            title: "Sản phẩm yêu thích",
            icon: null,
            function: () => { }
        },
        {
            title: "Đổi mật khẩu",
            icon: null,
            function: () => { }
        },
        {
            title: "Đăng xuất",
            icon: <ImExit />,
            function: () => {
                try {
                    Auth.logout()
                    setAuth({})
                    Toast("success", "đăng xuất thành công")
                    navigate("/")
                } catch (error) {
                    Toast("error", error.message)
                }

            }
        },

    ])
    return (
        <div className='user'>
            <div className='user-information'>
                <div className='user-information_title'>
                    <div className='user-information_icon'>

                        <AiOutlineUser />
                    </div>
                    <h2></h2>
                </div>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "flex-start" }}>
                    {
                        userItem.map((item, index, arr) => {

                            return <div className={`user-information_item ${index === activeTab && "exit-user"}`} key={index} onClick={() => { setActiveTab(index); item.function() }}>{item.icon && item.icon}<h3>{item.title}</h3></div>
                        })
                    }
                </div>




            </div>

            {switchTab(activeTab)}

        </div>
    )
}

export default User