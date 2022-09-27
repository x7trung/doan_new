import React, { useEffect, useState } from 'react'
import { Input, Select } from 'antd';
import '../../assets/odermanage.css'
import TableOrder from './TableOder';
import Orders from '../../services/orderServices';

import DateOrder from './DateOrder';

const { Search } = Input;
const { Option } = Select;
const OderManage = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [searchKey, setSearchKey] = useState("")
    const onSearch = (value) => setSearchKey(value);
    const [searchBy, setSearchBy] = useState("")
    const [state, setState] = useState("")
    console.log(state)

    const getData = async () => {
        setLoading(true)
        try {
            const params = {
                limit: 10, page: 1,
            }
            const data = await Orders.getOrders(params)
            setTotal(data.count)
            setData(data.data.map((i, index) => {
                return {
                    key: index,
                    ...i,
                    amount: (i.product.reduce((acc, cur) => {
                        return acc + cur.product_price * Number(cur.product_quantity)
                    }, 0) * (100 - i.voucher) / 100) + 30000
                }
            }))
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    const getDataOders = async () => {
        setLoading(true)
        try {
            let params
            if (searchBy == "name") {
                params = {
                    limit: 10, page: page, "name[regex]": searchKey
                }
            } else if (searchBy == "address") {
                params = {
                    limit: 10, page: page, "address[regex]": searchKey
                }
            } else if (searchBy == "phone") {
                params = {
                    limit: 10, page: page, "phone[regex]": searchKey
                }
            } else if (state != "") {
                console.log("hello")
                params = {
                    limit: 10, page: page, "state[regex]": state
                }
            } else {
                params = {
                    limit: 10, page: page,
                }
            }

            const data = await Orders.getOrders(params)
            setTotal(data.count)
            setData(data.data.map((i, index) => {
                return {
                    key: index,
                    ...i,
                    amount: (i.product.reduce((acc, cur) => {
                        return acc + cur.product_price * Number(cur.product_quantity)
                    }, 0) * (100 - i.voucher) / 100) + 30000
                }
            }))
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        getDataOders()
    }, [page, searchKey, state])
    if (loading) {
        return <div>Loading....</div>
    }
    return (
        <>
            <div className='oder-manage'>
                <div className='oder-manage_title'>
                    Danh sách đơn đặt hàng
                </div>
                <div className='oder-manage_search'>
                    <Search
                        placeholder="Tìm kiếm đơn đặt hàng"
                        defaultValue={searchKey}
                        onSearch={onSearch}
                        style={{
                            width: 300,
                        }}
                    />
                    <Select
                        defaultValue={searchBy}
                        style={{
                            width: 120,
                        }}
                        onChange={(value) => setSearchBy(value)}
                    >
                        <Option value="">Tất cả</Option>
                        <Option value="name">Tên</Option>
                        <Option value="address">Địa chỉ</Option>
                        <Option value="phone">Số điện thoại</Option>

                    </Select>
                </div>
                <div className='oder-manage_add'>
                    <DateOrder setState={setState} state={state} />
                </div>

            </div>
            <TableOrder data={data} setData={setData} total={total} page={page} setPage={setPage} />

        </>
    )
}

export default OderManage