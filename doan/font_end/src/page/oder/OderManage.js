import React, { useEffect, useState } from 'react'
import { Input, Modal, Button } from 'antd';
import '../../assets/odermanage.css'
import TableOrder from './TableOder';
import Orders from '../../services/orderServices';
import DetailOrder from './DetailOrder';
import DateOrder from './DateOrder';

const { Search } = Input;
const OderManage = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    const getData = async () => {
        setLoading(true)
        try {
            const data = await Orders.getOrders()
            setData(data.data.map((i, index) => {

                return {
                    key: index,
                    ...i,
                    amount: (i.product.reduce((acc, cur) => {
                        return acc + cur.price * Number(cur.quantity)
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
    const onSearch = (value) => console.log(value);

    console.log(data)

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
                        onSearch={onSearch}
                        style={{
                            width: 300,
                        }}
                    />
                </div>
                <div className='oder-manage_add'>
                    <DateOrder />
                </div>

            </div>
            <TableOrder data={data} />

        </>
    )
}

export default OderManage