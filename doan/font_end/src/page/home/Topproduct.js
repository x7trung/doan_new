import React from 'react'
import '../../assets/topproduct.css'
import { Table } from 'antd';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
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
const Topproduct = () => {
    return (
        <div className='topproduct'>
            <div className='toproductseling'>
                <h4>Top sản phẩm bán chạy</h4>
                <Table columns={columns} dataSource={data} size="middle" />
            </div>
            <div className='toproductlike'>
                <h4>Top khách hàng mua nhiều nhất</h4>
                <Table columns={columns} dataSource={data} size="middle" />
            </div>
        </div>
    )
}

export default Topproduct