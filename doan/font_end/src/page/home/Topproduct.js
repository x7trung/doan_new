import React from 'react'
import '../../assets/topproduct.css'
import { Avatar, Table } from 'antd';
const columns = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'product_code',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'product_name',
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'product_image',
        render: (_, { product_image }) => {
            return (
                <img src={product_image} alt="" style={{ height: 35, width: 35 }} />
            );

        }

    },
    {
        title: 'Màu sắc',
        dataIndex: 'product_color',
    },
    {
        title: 'Số lượng',
        dataIndex: 'product_quantity',
    },
    {
        title: 'Giá tiền',
        dataIndex: 'product_price',
        render: (num) => {

            return <p>{Number(num).toLocaleString()}đ</p>
        }
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];
const Topproduct = ({ dataProductSale, dataTopProduct }) => {
    console.log(dataProductSale, dataTopProduct)

    return (
        <div className='topproduct'>
            <div className='toproductseling'>
                <h4>Top sản phẩm bán chạy</h4>
                <Table columns={columns} dataSource={dataTopProduct} size="middle" pagination={false} />
            </div>
            <div className='toproductlike'>
                <h4>Đơn đặt hàng trong ngày</h4>
                <Table columns={columns} dataSource={dataProductSale} size="middle" pagination={false} />
            </div>
        </div>
    )
}

export default Topproduct