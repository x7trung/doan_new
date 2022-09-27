import React, { useState, useContext } from 'react'
import '../assets/css/header.css'
import { Badge, Input, Select } from 'antd';
import { BsBagFill } from 'react-icons/bs';
import { Menu, Dropdown, Space, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import { FaUserAlt } from 'react-icons/fa';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const { Option } = Select;
const { Search } = Input;
const Header = () => {
    const menu = [
        {
            title: "TRANG CHỦ",
            chidren: null,
            link: "/"

        },
        {
            title: "HÀNG MỚI",
            chidren: null,
            link: "/product-list?list=0&search=created"


        },
        {
            title: "SALE",
            chidren: null,
            link: "/product-list?list=0&search=discount"

        },
        {
            title: "BÁN CHẠY",
            chidren: null,
            link: "/product-list?list=0&search=sale"

        },
        {
            title: "TIN TỨC",
            chidren: null,
            link: "",

        },
        {
            title: "DANH MỤC TÚI XÁCH",
            icon: <DownOutlined />,
            link: "",
            chidren: <Menu
                items={[
                    {
                        label: (
                            <Link to="/product-list?list=0">
                                Tất cả sản phẩm
                            </Link>
                        ),
                        key: '0',
                    },
                    {
                        label: (
                            <Link to="/product-list?list=1">
                                Túi đeo chéo
                            </Link>
                        ),
                        key: '1',
                    },
                    {
                        label: (
                            <Link to="/product-list?list=2">
                                Túi cầm tay
                            </Link>
                        ),
                        key: '2',
                    },
                    {
                        label: (
                            <Link to="/product-list?list=3">
                                Túi đeo vai
                            </Link>
                        ),
                        key: '3',
                    },
                    {
                        label: (
                            <Link to="/product-list?list=4">
                                Túi ví
                            </Link>
                        ),
                        key: '4',
                    },
                    {
                        label: (
                            <Link to="/product-list?list=5">
                                Túi tote
                            </Link>
                        ),
                        key: '5',
                    },

                ]}
            />

        },
        {
            title: "NHÃN HIỆU",
            icon: <DownOutlined />,
            link: "",
            chidren: <Menu
                items={[
                    {
                        label: (
                            <Link to="/product-list">
                                MICOCAH
                            </Link>



                        ),
                        key: '0',
                    },
                    {
                        label: (
                            <Link to="/product-list">
                                NARCI
                            </Link>
                        ),
                        key: '1',
                    },
                    {
                        label: (

                            <Link to="/product-list">
                                PRETTYZYS
                            </Link>
                        ),
                        key: '2',
                    },
                    {
                        label: (
                            <Link to="/product-list">
                                JUST START
                            </Link>
                        ),
                        key: '3',
                    },
                    {
                        label: (
                            <Link to="/product-list">
                                NUCELLE
                            </Link>
                        ),
                        key: '4',
                    },
                    {
                        label: (
                            <Link to="/product-list">
                                ELLY DE PARIS
                            </Link>
                        ),
                        key: '5',
                    },
                ]}
            />

        },
        {
            title: "GIỚI THIỆU",
            chidren: null,
            link: "",
        },
    ]
    const { cartState } = useContext(CartContext)
    let navigate = useNavigate()
    const { auth } = useContext(AuthContext)
    const [visible, setVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(0)
    const [searchBy, setSearchBy] = useState("name")

    const handleChange = (value) => {
        setSearchBy(value)
    };

    const onSearch = (value) => {
        const url = searchBy == "name" ? `/product-list?list=0&name=${value}` : `/product-list?list=0&nameNCC=${value}`;
        window.location = "http://localhost:4000" + url
    }

    return (

        <div className='main-header'>
            <div className="header">
                <Link to="/">
                    <img src="https://cdn.elly.vn/uploads/2020/12/06111440/logo-black.svg" className="header-logo" />
                </Link>
                <div className="header-search">
                    <Select className="header-search_lucy"
                        defaultValue={searchBy}
                        style={{
                            width: 170,
                        }}
                        onChange={handleChange}
                    >

                        <Option value="name">Tên</Option>
                        <Option value="nameNCC">Hãng</Option>
                    </Select>
                    <Search className="header-search_input"
                        placeholder="Tìm kiếm"
                        onSearch={onSearch}
                        style={{
                            width: 300,
                            height: 40
                        }}
                    />
                </div>
                <div className="header-account">
                    <div className='header-account_login'>
                        {!auth.id ? <p onClick={() => setVisible(true)}>Đăng nhập</p> : <Link to="/user"><FaUserAlt className="account-user"
                        /></Link>}


                        <Modal
                            title={activeTab == 0 ? "Đăng nhập" : activeTab == 1 ? "Đăng ký" : "Quên mật khẩu"}
                            centered
                            visible={visible}
                            onOk={() => setVisible(false)}
                            onCancel={() => setVisible(false)}
                            width={870}
                            footer={null}
                        >
                            {switchTab(activeTab, setActiveTab, setVisible)}
                        </Modal>
                    </div>
                    <div className="account-cart">
                        <Link to="/cart" style={{ color: "rgb(80, 78, 78)" }}>
                            <Badge count={cartState.amount} color="#ee4d2d">
                                <BsBagFill style={{ fontSize: 25, marginLeft: 10, color: "rgb(80, 78, 78)" }} />
                            </Badge>

                        </Link>
                        <h5 className="account-text" style={{ marginLeft: 10 }}>{cartState.total ? cartState.total.toLocaleString() : 0}đ</h5>
                    </div>

                </div>

            </div>
            <div className="menu">
                <ul className="menu-sub">
                    {menu.map((i, id) => {
                        return <div key={id}>
                            <HeaderMenu title={i.title} menuItem={i.chidren} icon={i.icon} link={i.link} />
                        </div>
                    })}
                </ul>
            </div>
        </div>

    )

}

export default Header
const switchTab = (index, setActiveTab, setVisible) => {
    switch (index) {
        case 0:
            return <Login setActiveTab={setActiveTab} setVisible={setVisible} />
        case 1:
            return <Signup setActiveTab={setActiveTab} />
        case 2:
            return <ForgotPassword setActiveTab={setActiveTab} />
        default:
            return <Login setActiveTab={setActiveTab} setVisible={setVisible} />
    }
}





const HeaderMenu = ({ title, menuItem, icon, link }) => {
    if (menuItem) {
        return <Dropdown overlay={menuItem}>
            <div className="menu-subitem">


                <Space>
                    {title}
                    {icon && icon}
                </Space>

            </div>
        </Dropdown>
    } else {
        return <Link to={link} className="menu-subitem" style={{ color: "#000" }}> {title}</Link>
    }
}