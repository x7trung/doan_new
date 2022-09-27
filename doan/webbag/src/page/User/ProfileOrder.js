import React, { useState, useEffect, useContext } from 'react'
import { Tabs } from 'antd';
import userServices from '../../services/userServices'
import '../../assets/css/profile-user_order.css'
import AllOrder from './AllOrder';
import { AuthContext } from "../../context/AuthContext"

const { TabPane } = Tabs;




const ProfileOrder = () => {
    const [loading, setLoading] = useState(false)
    const { auth } = useContext(AuthContext)
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const { data } = await userServices.getUser(auth.id)
                setData(data.orders)

            } catch (error) {
                console.log(error.message)
            }
            setLoading(false);

        }
        getData()
    }, [])



    return (

        <div className='profileorder-information'>
            <Tabs defaultActiveKey="0" >
                <TabPane tab="Tất cả đơn hàng" key="0">
                    <AllOrder data={data} />
                </TabPane>
                <TabPane tab="Chờ xác nhận" key="1">
                    <AllOrder data={data.filter(i => i.state === "Chờ xác nhận").sort((a, b) => new Date(b.oderdate) - new Date(a.oderdate)
                    )} setData={setData} />
                </TabPane>
                <TabPane tab="Đang giao" key="2">
                    <AllOrder data={data.filter(i => i.state === "Đang giao hàng").sort((a, b) => new Date(b.oderdate) - new Date(a.oderdate)
                    )} />
                </TabPane>
                <TabPane tab="Đã giao" key="3">
                    <AllOrder data={data.filter(i => i.state === "Giao hàng thành công").sort((a, b) => new Date(b.oderdate) - new Date(a.oderdate)
                    )} />
                </TabPane>
                <TabPane tab="Đã huỷ" key="4">
                    <AllOrder data={data.filter(i => i.state === "Huỷ hàng").sort((a, b) => new Date(b.oderdate) - new Date(a.oderdate)
                    )} />
                </TabPane>
            </Tabs>
        </div>


    )
}

export default ProfileOrder