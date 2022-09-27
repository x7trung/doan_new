import { Table } from 'antd';
import React from 'react';
const columns = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'product_code',
        width: '150px'
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
    },
    // {
    //     title: 'Hình ảnh',
    //     dataIndex: 'product_image',
    //     width: '250px'
    // },
    {
        title: 'lượt thích',
        dataIndex: 'like',
        width: '150px'
    },
    {
        title: 'Chất liệu',
        dataIndex: 'material',
        width: '200px'
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

const Topproduct_like = ({ dataProductLike }) => {

    return (<div>
        <Table columns={columns} dataSource={dataProductLike} size="middle" />

    </div>)
}


export default Topproduct_like