
import React, { useState, useEffect } from 'react'
import TableList from '../product/Table'
import '../../assets/product-add.css'
import { Input, Button, Modal } from 'antd';
import Add from './Add';
import Products from "../../services/productServices"
import Date from './Date';



const { Search } = Input;
const Product = () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        setLoading(true)
        try {
            const data = await Products.getProducts()
            console.log(data.data)
            setData(data.data.map((i, index) => {
                return {
                    key: index,
                    ...i, image: i.image.map(img =>
                        img.imageUrl
                    ),
                    import_price: i.history[0].price,
                    stock: i.detail.reduce((acc, cur) => {
                        return acc + cur.quantity
                    }, 0)

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

    if (loading) {
        return <div>loading....</div>
    }
    return (
        <div>
            <div className='product-add'>
                <div>
                    <Date />
                </div>
                <div className='product-search'>

                    <Search
                        placeholder="Tìm kiếm sản phẩm"
                        onSearch={onSearch}
                        style={{
                            width: 300,
                        }}
                    />
                </div>
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
            <div className='table-product'>
                <TableList data={data} />
            </div>
        </div>
    )
}

export default Product