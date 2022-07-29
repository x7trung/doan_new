import { Avatar, Table, Modal, Button, Form, Input, InputNumber, Popconfirm, Typography, Tooltip, Pagination } from 'antd';
import { useState } from 'react';
import Products from '../../services/productServices';
import ImportGoods from './ImportGoods';
import Inventory from './Inventory';
import moment from 'moment'
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
    const [editingKey, setEditingKey] = useState('');
    const [deletingKey, setDeletingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const isDeleting = (record) => record.key === deletingKey;
    const [product, setProduct] = useState([])
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
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            editable: true,
        },
        {
            title: 'Giá nhập',
            dataIndex: 'import_price',
        },

        {
            title: 'Hàng tồn',
            dataIndex: 'stock',

        },
        {
            title: 'hàng bán',
            dataIndex: 'sale',
        },
        {
            title: 'Chi tiết hàng tồn',
            dataIndex: 'amount',

            render: (_, record) => {
                return <Button onClick={() => {
                    setVisible(true)
                    setProduct(record.history.filter(i => month.month == i.created).slice(-1)[0].detail.map((item, index) => {
                        return {
                            ...item, name: record.name, size: record.size, key: index, quantity: item.quantity - record.orders.filter(i => month.month == moment(i.receiveddate).format('M')).reduce((acc, cur) => {
                                return acc + cur.product.reduce((a, c) => {
                                    if (c.product_color == item.color && c.product_id == record._id)
                                        return a + c.product_quantity
                                    else return a + 0
                                }, 0)
                            }, 0)
                        }
                    }))
                }}> Xem chi tiết</Button >

            },
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'nameNCC',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            editable: true,
        },
        {
            title: 'Hàng nhập',
            dataIndex: '',
            render: (_, record) => {

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
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Xoá',
            dataIndex: 'delete',
            render: (_, record) => {
                const deleteable = isDeleting(record);
                return deleteable ? (
                    <span>
                        <Typography.Link
                            onClick={() => deleteOrder(record._id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Xoá
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancelDelete}>
                            <a>Huỷ</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link disabled={deletingKey !== ''} onClick={() => setDeletingKey(record.key)} style={{ marginLeft: 25 }}>
                            Delete
                        </Typography.Link>
                    </>
                );
            },
        },

    ];
    const edit = (record) => {
        form.setFieldsValue({

            ...record,
        });

        setEditingKey(record.key);
        setDeletingKey("")
    };

    const cancel = () => {
        setEditingKey('');
    };
    const save = async () => {
        try {
            const { product_code, name, price, nameNCC, email } = form.getFieldValue()
            const { data: newData } = await Products.updateProduct(product_code, { name, price, nameNCC, email })
            setData(data.map(i => {
                if (i.product_code === newData.product_code) {
                    return {
                        ...i,
                        nameNCC: nameNCC, email: email,
                        name: name,
                        price: price,
                        detail: newData.detail,
                        history: newData.history,
                        stock: newData.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0)

                    }
                } else return i
            }))

            setEditingKey('');
        } catch (error) {
            console.log(error.message)
        }

    };
    const cancelDelete = () => {
        setDeletingKey('');
    };
    const deleteOrder = async (id) => {
        try {
            await Products.deleteProduct(id)
            setData(data.filter(i => i._id !== id))
            setDeletingKey('');
            setEditingKey("");
        } catch (error) {
            setDeletingKey('');
            setEditingKey("");
        }

    };

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'price' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                    scroll={{
                        x: 1500,
                    }}
                />
            </Form>
            <Pagination defaultCurrent={page} total={totalProduct} onChange={(value) => setPage(value)} />
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
                onCancel={() => {
                    setProduct([])
                    setVisibleA(false)
                }}
                width={800}
                footer={null}
                maskClosable={false}
            >
                <ImportGoods product={product} setData={setData} data={data} month={month} />
            </Modal>
        </div>

    );
}

export default TableList