import React, { useState, useEffect } from 'react'
import { Input, Modal } from 'antd';
import '../../assets/user.css'
import AddUser from './AddUser';
import TableUser from './TableUser';
import userServices from '../../services/userServices';
import Toast from "../../components/Toast";


const { Search } = Input;
const User = () => {
    const onSearch = (value) => console.log(value);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    //hàm call api
    const getUser = async () => {
        setLoading(true)
        try {
            const { data } = await userServices.getUsers();
            setData(data.map((i, idx) => {
                return { ...i, key: idx }
            }))
        } catch (error) {
            Toast("error", error.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [])
    //useEffect thường để call api
    //[] chạy 1 lần khi xuất hiện
    //[deps] chạy mỗi khi deps thay đỔi
    // không truyền vào mảng thì sẽ chạy mỗi khi useState thay đỔi

    if (loading) {
        return <div>loading...</div>
    }
    return (
        <div>
            <div className='user-manage'>
                <div>
                    <h3>Quản lý khách hàng</h3>
                </div>
                <div className='user-manage_search'>
                    <Search
                        placeholder="Tìm kiếm khách hàng"
                        onSearch={onSearch}
                        style={{
                            width: 300,
                        }}
                    />
                </div>
                <div className='user-manage_add'>
                    <button onClick={() => setVisible(true)}>thêm người dùng</button>
                    <Modal
                        title="Thêm người dùng"
                        centered
                        visible={visible}
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        width={1000}
                        footer={null}
                        maskClosable={false}
                    >
                        <AddUser />
                    </Modal>
                </div>
            </div>
            <TableUser data={data} />
        </div>
    )
}

export default User