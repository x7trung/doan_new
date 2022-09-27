
import React, { useState, useEffect } from 'react'
import TableList from '../product/Table'
import '../../assets/product-add.css'
import { Input, Select } from 'antd';
import Products from "../../services/productServices"

const { Option } = Select;


const { Search } = Input;
const Product = () => {
    const [searchBy, setSearchBy] = useState("")

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const [totalProduct, setTotalProduct] = useState(0)
    const [page, setPage] = useState(1)
    const [searchKey, setSearchKey] = useState("")
    const onSearch = (value) => setSearchKey(value);




    const getData = async () => {

        setLoading(true)
        try {
            const params = {
                limit: 10, page: 1, sort: "product_code"
            }
            const data = await Products.getProducts(params)
            setTotalProduct(data.count)
            // const result = await Products.getTotal({ month: Number(month.month) })
            // setTotal(result)

            setData(data.data.map((i, index) => {
                const thisStock = i.detail.reduce((acc, cur) => { return acc + cur.quantity }, 0)
                const thisPreOrder = i.pre_order.reduce((acc, cur) => { return acc + cur.quantity }, 0)
                return {
                    key: index,
                    ...i, image: i.image.map(img =>
                        img.imageUrl
                    ),

                    pre_order: thisPreOrder > 0 ? thisStock - thisPreOrder : thisStock,
                    import_price: (i.price * 100 / 150),
                    stock: thisStock

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
        getDataBySearch()
    }, [page, searchKey])
    console.log(data)
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
                    limit: 10, page: page, "name[regex]": searchKey, sort: "product_code"
                }
            } else if (searchBy == "product_code") {
                params = {
                    limit: 10, page: page, "product_code[regex]": searchKey, sort: "product_code"
                }
            } else {
                params = {
                    limit: 10, page: page, "price[lt]": searchKey, sort: "product_code"
                }
            }

            const data = await Products.getProducts(params)
            setTotalProduct(data.count)

            setData(data.data.map((i, index) => {
                const thisStock = i.detail.reduce((acc, cur) => { return acc + cur.quantity }, 0)
                const thisPreOrder = i.pre_order.reduce((acc, cur) => { return acc + cur.quantity }, 0)
                return {
                    key: index,
                    ...i, image: i.image.map(img =>
                        img.imageUrl
                    ),
                    // pre_order: thisPreOrder,
                    pre_order: thisPreOrder > 0 ? thisStock - thisPreOrder : thisStock,
                    import_price: (i.price * 100 / 150),
                    stock: thisStock

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
                    {/* <DatePicker setMonth={setMonth} month={month} /> */}
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
                    <Select
                        defaultValue={searchBy}
                        style={{
                            width: 120,
                        }}
                        onChange={(value) => setSearchBy(value)}
                    >
                        <Option value="">Tất cả</Option>
                        <Option value="name">Tên</Option>
                        <Option value="product_code">Mã sản phẩm</Option>
                        <Option value="price">Giá bán</Option>

                    </Select>
                </div>

                <div></div>
            </div>

            <div className='table-product'>
                <TableList data={data} setData={setData} page={page} setPage={setPage} totalProduct={totalProduct} />
            </div>

        </div>
    )
}

export default Product