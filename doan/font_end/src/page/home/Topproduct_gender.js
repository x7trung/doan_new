import { Table } from 'antd';
import React from 'react';
import '../../assets/topproduct_gender.css'
const columns = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'product_code',
        width: '150px'
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'product_name',
    },
    // {
    //     title: 'Hình ảnh',
    //     dataIndex: 'product_image',
    //     width: '250px'
    // },
    {
        title: 'Giới tính',
        dataIndex: 'gender',
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

const Topproduct_gender = ({ dataProductMate }) => {

    return (<div className='topproduct_gender'>
        <div className='topproduct-gender_title'>
            <h3>Top sản phẩm da bò nam bán chạy</h3>
        </div>
        <Table columns={columns} dataSource={dataProductMate} size="middle" />

    </div>)
}


export default Topproduct_gender