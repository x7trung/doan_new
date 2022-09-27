import React from 'react'
import { Avatar, Table } from 'antd';


const columns = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'product_code',

    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'image',
        render: (_, { image }) => {
            return (
                <Avatar.Group
                    maxCount={3}
                    maxStyle={{
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                    }}
                >
                    {image.map((img, index) => {
                        return <Avatar src={img} key={index} />
                    })}
                </Avatar.Group >
            );

        }
    },
    {
        title: 'Hàng tồn',
        dataIndex: 'stockNum',
    },
    {
        title: 'Hàng nhập',
        dataIndex: 'importNum',
    },
    {
        title: 'Hàng bán',
        dataIndex: 'saleNum',
    },
];


const TableStock = ({ data }) => {
    return (
        <div>
            <Table columns={columns} dataSource={data} size="middle" />
        </div>
    )
}

export default TableStock