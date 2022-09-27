import { Avatar, Table, Modal, Button, Form, Input, InputNumber, Popconfirm, Typography, Tooltip, Pagination } from 'antd';
import { useState } from 'react';
import Products from '../../services/productServices';
import ImportGoods from './ImportGoods';
import Inventory from './Inventory';
import moment from 'moment'
import Edit from './Edit';
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


const TableList = ({ data, setData, month, page, setPage, totalProduct }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [visibleA, setVisibleA] = useState(false);
    const [product, setProduct] = useState([])
    const [editProduct, setEditProduct] = useState({})
    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'product_code',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            editable: true,
            render: (name) => {
                return <Tooltip title={name}>{name.slice(0, 20)}...</Tooltip>
            }
        },

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
            title: 'Giảm giá',
            dataIndex: 'discount',
            render: (_, record) => {
                return <p>{record.discount + '%'}</p>
            }

        },

        {
            title: 'Giá bán',
            dataIndex: 'price',
            render: (_, record) => {
                return <p>{Number(record?.price || '0').toLocaleString()}đ</p>
            }
        },
        {
            title: 'Số lượng(tồn)',
            dataIndex: 'stock',

        },
        // {
        //     title: 'Số lượng(ảo)',
        //     dataIndex: 'pre_order',

        // },
        {
            title: 'Chi tiết sản phẩm',
            dataIndex: 'amount',

            render: (_, record) => {
                return <Button onClick={() => {
                    setVisible(true)
                    setProduct(record.detail.map(i => {
                        return {
                            ...i, name: record.name, size: record.size, material: record.material, strap_type: record.strap_type, style_lock: record.style_lock, classify: record.classify, madeIn: record.madeIn,
                        }
                    }))
                }}> Xem chi tiết</Button >

            },
        },
        {
            title: 'Bảo hành',
            dataIndex: 'insurance',
            render: (_, record) => {
                return <p>{Number(record?.insurance || '0')} Tháng</p>
            }
        },
        {
            title: 'Chỉnh sửa',
            dataIndex: 'operation',
            render: (_, record) => {
                return <Typography.Link onClick={() => {
                    setVisibleA(true);
                    setEditProduct(record)
                }}>
                    Edit
                </Typography.Link >
            },
        },
        // {
        //     title: 'Xoá',
        //     dataIndex: 'operation',
        //     render: (_, record) => {
        //         return <Typography.Link >
        //             Edit
        //         </Typography.Link>
        //     },
        // },

    ];


    return (
        <div>

            <Table
                bordered
                dataSource={data}
                columns={columns}
                pagination={false}
                scroll={{
                    x: 1000,
                }}
            />

            <Modal
                title="Chi tiết sản phẩm"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
                footer={null}
                maskClosable={false}
            >
                <Inventory product={product} />
            </Modal>
            <Modal
                title={`Chỉnh sửa sản phẩm mã: ${editProduct.product_code || 123045}`}
                centered
                visible={visibleA}
                onOk={() => setVisibleA(false)}
                onCancel={() => setVisibleA(false)}
                width={800}
                footer={null}
                maskClosable={false}
            >
                <Edit editProduct={editProduct} />
            </Modal>
            <div className="page_product-item">
                <Pagination defaultCurrent={page} total={totalProduct} onChange={(value) => setPage(value)} />
            </div>
        </div>

    );
}

export default TableList