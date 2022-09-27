import React, { useEffect, useState } from 'react'
import '../../assets/stock.css'
import TableStock from './TableStock';
import moment from 'moment'
import DateSlect from './Date';
import Products from '../../services/productServices';
import Toast from "../../components/Toast"

const Stock = () => {
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState({
        totalProduct: 0,
        totalSale: 0,
        totalImport: 0, Datatable: []
    })
    const [selectDate, setSelectDate] = useState({
        month: moment(new Date()).format("M"),
        year: moment(new Date()).format("Y"),
    })

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const result = await Products.getTotal({ month: Number(selectDate.month) })
                setTotal(result)
            } catch (error) {
                Toast("error", error.message)
            }
            setLoading(false)
        }
        getData()
    }, [selectDate])

    if (loading) return <div>Loading ....</div>
    return (
        <div>
            <div className='product-sum'>
                <div className='stock-name'>
                    <h3>Tháng:</h3>
                    <DateSlect month={selectDate} setMonth={setSelectDate} />
                </div>
                <div className='product-sum_item'>
                    <h3>Tổng hàng tồn tất cả sản phẩm: <span>{total.totalProduct}</span></h3>
                </div>
                <div className='product-sum_item'>
                    <h3>Tổng hàng bán tất cả sản phẩm: <span>{total.totalSale}</span></h3>
                </div>
                <div className='product-sum_item'>
                    <h3>Tổng hàng nhập tất cả sản phẩm: <span>{total.totalImport}</span></h3>
                </div>

            </div>
            <div className='stock-table'>
                <TableStock data={total.Datatable} />
            </div>
        </div>
    )
}

export default Stock