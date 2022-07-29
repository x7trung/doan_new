import React, { useState, useEffect } from 'react'
import { Input, Modal } from 'antd';
import '../../assets/user.css'
import AddUser from './AddUser';
import TableUser from './TableUser';
import userServices from '../../services/userServices';
import Toast from "../../components/Toast";


const { Search } = Input;
const User = () => {

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [searchKey, setSearchKey] = useState("")
    const onSearch = (value) => setSearchKey(value);
    //hàm call api
    const getUser = async () => {
        setLoading(true)
        try {
            const params = {
                limit: 10, page: 1,
            }
            const { data, count } = await userServices.getUsers(params);
            setTotal(count)
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

    useEffect(() => {
        getUserBySearch()
    }, [searchKey, page])


    const getUserBySearch = async () => {
        setLoading(true)
        try {
            const params = {
                limit: 10, page: page, "name[regex]": searchKey
            }
            const { data, count } = await userServices.getUsers(params);
            setTotal(count)
            setData(data.map((i, idx) => {
                return { ...i, key: idx }
            }))
        } catch (error) {
            Toast("error", error.message)
        }
        setLoading(false)
    }


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
                        defaultValue={searchKey}
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
            <TableUser data={data} total={total} page={page} setPage={setPage} />
        </div>
    )
}

export default User