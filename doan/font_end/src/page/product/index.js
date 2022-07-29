
import React, { useState, useEffect } from 'react'
import TableList from '../product/Table'
import '../../assets/product-add.css'
import { Input, Modal, Select } from 'antd';
import Add from './Add';
import Products from "../../services/productServices"
import DatePicker from './Date';
import moment from 'moment'
const { Option } = Select;


const { Search } = Input;
const Product = () => {
    const [searchBy, setSearchBy] = useState("")
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([])
    const [month, setMonth] = useState({
        month: moment(new Date()).format("M"),
        year: moment(new Date()).format("Y"),
    })
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState({
        totalProduct: 0,
        totalSale: 0,
        newProductGoods: 0
    })
    const [totalProduct, setTotalProduct] = useState(0)
    const [page, setPage] = useState(1)
    const [searchKey, setSearchKey] = useState("")
    const onSearch = (value) => setSearchKey(value);




    const getData = async () => {

        setLoading(true)
        try {
            const params = {
                limit: 10, page: 1,
            }
            const data = await Products.getProducts(params)
            setTotalProduct(data.count)
            const result = await Products.getTotal({ month: Number(month.month) })
            setTotal(result)
            setData(data.data.map((i, index) => {
                return {
                    key: index,
                    ...i, image: i.image.map(img =>
                        img.imageUrl
                    ),
                    import_price: i.history[0].price,
                    stock: i.history.filter(item => item.created == month.month).slice(-1)
                        ?.reduce((acc, cur) => {
                            return acc + cur.detail.reduce((a, c) => {
                                return a + c.quantity
                            }, 0)
                        }, 0) - i.historySale.filter(item => item.month == month.month)[0]?.sale || i.history.filter(item => item.created == month.month).slice(-1)
                            ?.reduce((acc, cur) => {
                                return acc + cur.detail.reduce((a, c) => {
                                    return a + c.quantity
                                }, 0)
                            }, 0)
                    ,
                    sale: i.historySale.find(item => item.month == month.month)?.sale || 0
                }
            }))
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [month])
    useEffect(() => {
        getDataBySearch()
    }, [page, searchKey])

    const getDataBySearch = async () => {

        setLoading(true)
        try {
            let params
            if (searchBy == "") {
                params = {
                    limit: 10, page: page, sort: "product_code"
                }
            } else if (searchBy == "name") {
                params = {
                    limit: 10, page: page, "name[regex]": searchKey
                }
            } else if (searchBy == "product_code") {
                params = {
                    limit: 10, page: page, "product_code[regex]": searchKey
                }
            } else {
                params = {
                    limit: 10, page: page, "price[lt]": searchKey
                }
            }

            const data = await Products.getProducts(params)
            setTotalProduct(data.count)
            const result = await Products.getTotal({ month: Number(month.month) })
            setTotal(result)
            setData(data.data.map((i, index) => {
                return {
                    key: index,
                    ...i, image: i.image.map(img =>
                        img.imageUrl
                    ),
                    import_price: i.history[0].price,
                    stock: i.history.filter(item => item.created == month.month).slice(-1)
                        ?.reduce((acc, cur) => {
                            return acc + cur.detail.reduce((a, c) => {
                                return a + c.quantity
                            }, 0)
                        }, 0) - i.historySale.filter(item => item.month == month.month)[0]?.sale || i.history.filter(item => item.created == month.month).slice(-1)
                            ?.reduce((acc, cur) => {
                                return acc + cur.detail.reduce((a, c) => {
                                    return a + c.quantity
                                }, 0)
                            }, 0)
                    ,
                    sale: i.historySale.find(item => item.month == month.month)?.sale || 0
                }
            }))
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }


    if (loading) {
        return <div>loading....</div>
    }
    return (
        <div>
            <div className='product-add'>
                <div>
                    <DatePicker setMonth={setMonth} month={month} />
                </div>
                <div className='product-search'>

                    <Search
                        placeholder="Tìm kiếm sản phẩm"
                        defaultValue={searchKey}
                        onSearch={onSearch}
                        style={{
                            width: 300,
                        }}
                        allowClear
                    />
                </div>
                <Select
                    defaultValue={searchBy}
                    style={{
                        width: 120,
                    }}
                    onChange={(value) => setSearchBy(value)}
                >
                    <Option value="">All</Option>
                    <Option value="name">Tên</Option>
                    <Option value="product_code">Mã sản phẩm</Option>
                    <Option value="price">Giá bán</Option>

                </Select>
                <div className='product-add_data'>
                    <button onClick={() => setVisible(true)}>Thêm sản phẩm</button>
                    <Modal
                        title="Thêm Sản phẩm"
                        centered
                        visible={visible}
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        width={1000}
                        footer={null}
                        maskClosable={false}
                    >
                        <Add />
                    </Modal>
                </div>
            </div>
            <div className='product-sum'>
                <div className='product-sum_item'>
                    <h3>Tổng hàng tồn tất cả sản phẩm: <span>{total.totalProduct}</span></h3>
                </div>
                <div className='product-sum_item'>
                    <h3>Tổng hàng bán tất cả sản phẩm: <span>{total.totalSale}</span></h3>
                </div>
                <div className='product-sum_item'>
                    <h3>Tổng hàng nhập tất cả sản phẩm: <span>{total.newProductGoods}</span></h3>
                </div>
            </div>
            <div className='table-product'>
                <TableList data={data} setData={setData} month={month} page={page} setPage={setPage} totalProduct={totalProduct} />
            </div>
        </div>
    )
}

export default Product