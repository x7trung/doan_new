import { Avatar, Table, Modal, Button } from 'antd';
import { useState } from 'react';
import ImportGoods from './ImportGoods';
import Inventory from './Inventory';




const TableList = ({ data }) => {

    const [visible, setVisible] = useState(false);
    const [visibleA, setVisibleA] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [product, setProduct] = useState([])
    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'product_code',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
        },
        // {
        //     title: 'Kích cỡ',
        //     dataIndex: 'size',
        // },
        {
            title: 'Hình ảnh',
            dataIndex: 'images',
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
            title: 'Giá bán',
            dataIndex: 'price',
        },
        {
            title: 'Giá nhập',
            dataIndex: 'import_price',
        },
        // {
        //     title: 'Mô tả',
        //     dataIndex: 'describe',
        // },
        {
            title: 'Hàng tồn',
            dataIndex: 'stock',
        },
        {
            title: 'Chi tiết hàng tồn',
            dataIndex: 'amount',

            render: (_, record) => {

                return <Button onClick={() => {
                    setVisible(true)
                    setProduct(record.detail.map((item, index) => {
                        return { ...item, name: record.name, size: record.size, key: index }
                    }))
                }}> Xem chi tiết</Button >

            },
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'nameNCC',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Hàng nhập',
            dataIndex: '',
            render: (_, record) => {
                console.log(record.history)
                return <Button onClick={() => {
                    setVisibleA(true)
                    setProduct(record.history.map((item, index) => {
                        return { ...item, product_code: record.product_code, name: record.name, size: record.size, key: index, }
                    }))
                }}> Xem chi tiết</Button >

            },
        },
        {
            title: 'Chỉnh sửa',

        },
        {
            title: 'Xoá',

        },

    ];
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }

                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }

                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };
    return (
        <div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            <Modal
                title="Chi tiết hàng tồn"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={800}
                footer={null}
                maskClosable={false}
            >
                <Inventory product={product} />
            </Modal>
            <Modal
                title="Chi tiết hàng nhập"
                centered
                visible={visibleA}
                onOk={() => setVisibleA(false)}
                onCancel={() => setVisibleA(false)}
                width={800}
                footer={null}
                maskClosable={false}
            >
                <ImportGoods product={product} />
            </Modal>
        </div>

    )
}

export default TableList