import React, { Children, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DownOutlined, SmileOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Avatar, Image, Dropdown, Space } from 'antd';
import { AiOutlineHome, AiFillSetting } from 'react-icons/ai';
import { FaProductHunt, FaUser } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { BsCartCheck } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <a >
                        admin
                    </a>
                ),
                icon: <FaUser />,
            },
            {
                key: '2',
                label: (
                    <a >
                        đăng xuất
                    </a>
                ),
                icon: <ImExit />,

            },

        ]}
    />
);


const Wrapper = ({ children }) => {
    let navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const onClick = (e) => {
        console.log(e.key)
        switch (e.key) {
            case "1":
                navigate("/")
                break
            // case "2":
            //     navigate("/totalincome")
            //     break
            case "2":
                navigate("/order")
                break
            case "3":
                navigate("/user")
                break
            case "4.1":
                navigate("/product")
                break
            case "4.2":
                navigate("/NCC")
                break
            case "4.3":
                navigate("/stock")
                break
            case "5":
                navigate("/admin")
                break
            default: navigate("/")
        }

    };
    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">
                        <img src='https://cdn.elly.vn/uploads/2020/12/06111440/logo-black.svg' />
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        onClick={onClick}
                        items={[
                            {
                                key: '1',
                                icon: <AiOutlineHome />,
                                label: 'Trang chủ',
                                link: "/"
                            },

                            {
                                key: '2',
                                icon: <BsCartCheck />,
                                label: 'Đơn đặt hàng',
                                link: "/order"
                            },
                            {
                                key: '3',
                                icon: <FaUser />,
                                label: 'Khách hàng',
                                link: "/user"
                            },
                            {
                                // key: '4',
                                label: 'Danh mục sản phẩm',
                                children: [{
                                    key: '4.1',
                                    label: 'Sản phẩm',
                                    link: "/product",
                                    className: "productItem_title",
                                },
                                {
                                    key: '4.2',
                                    label: 'Nhà cung cấp',
                                    link: "/NCC",
                                    className: "productItem_title",
                                },
                                {
                                    key: '4.3',
                                    label: 'Thống kê kho',
                                    link: "/stock",
                                    className: "productItem_title",
                                },

                                ],
                            },

                            {
                                key: '5',
                                icon: <AiFillSetting />,
                                label: 'Thiết lập',
                                link: "/admin"
                            },
                            {
                                key: '6',
                                icon: <ImExit />,
                                label: 'Đăng xuất',
                                link: "/"
                            },
                        ]}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                        }}
                    >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <div className="collapse">
                            {/* <div>
                                Cửa hàng Antorro
                            </div> */}
                            <div>
                                <Dropdown overlay={menu}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            Xin chào,Admin
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                        </div>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 700,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Wrapper