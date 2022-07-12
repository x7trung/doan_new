import React, { Children, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,

    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { AiOutlineHome, AiFillSetting } from 'react-icons/ai';
import { FaProductHunt, FaUser } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { BsCartCheck } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Wrapper = ({ children }) => {
    let navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const onClick = (e) => {
        console.log(e.key)
        switch (e.key) {
            case "1":
                navigate("/")
                break
            case "2":
                navigate("/totalincome")
                break
            case "3":
                navigate("/order")
                break
            case "4":
                navigate("/user")
                break
            case "5":
                navigate("/product")
                break
            default: navigate("/")
        }

    };
    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">Antorro</div>
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
                                icon: <GiMoneyStack />,
                                label: 'Tổng thu nhập',
                                link: "/totalincome"
                            },
                            {
                                key: '3',
                                icon: <BsCartCheck />,
                                label: 'Đơn đặt hàng',
                                link: "/order"
                            },
                            {
                                key: '4',
                                icon: <FaUser />,
                                label: 'Khách hàng',
                                link: "/user"
                            },
                            {
                                key: '5',
                                icon: <FaProductHunt />,
                                label: 'Sản phẩm',
                                link: "/product"
                            },
                            {
                                key: '6',
                                icon: <AiFillSetting />,
                                label: 'Thiết lập',
                                link: "/"
                            },
                            {
                                key: '7',
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