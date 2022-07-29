import { Table } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid'
const columns = [
    {
        title: 'Tên sản phẩm',
        dataIndex: 'product_name',
        width: 150,
    },
    {
        title: 'màu sắc',
        dataIndex: 'product_color',
        width: 150,
    },
    {
        title: 'số lượng',
        dataIndex: 'product_quantity',
        width: 150,
    },
    {
        title: 'Giá tiền',
        dataIndex: 'product_price',
        width: 150,
    },
];

const UserOrders = ({ userOrders }) => {
    console.log(userOrders)
    return (

        <Table
            columns={columns}
            dataSource={userOrders.map((item) => {
                return item.product.map(i => {
                    return { ...i, key: uuidv4() }
                })
            }).flat(Infinity)}
            pagination={{
                pageSize: 50,
            }}
            scroll={{
                y: 240,
            }}

        />
    )
};

export default UserOrders
