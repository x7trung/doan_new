import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import Products from '../../services/productServices';
import { v4 as uuidv4 } from 'uuid';


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
    const inputNode = inputType === 'number' ? <InputNumber min={0} max={50} step={1} /> : <Input />;
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

const ImportGoods = ({ product, setData, data, month }) => {
    const [newProduct, setNewProduct] = useState(product.filter(i => i.created == month.month).slice(-1)[0]?.detail.map((item, index) => {
        return { product_code: product[0].product_code, name: product[0].name, ...item, price: product[0].price, size: product[0].size, created: product.filter(i => i.created == month.month).slice(-1)[0].created, key: index }
    }) || [])

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    useEffect(() => {
        setNewProduct(product.filter(i => i.created == month.month).slice(-1)[0]?.detail.map((item, index) => {
            return { product_code: product[0].product_code, name: product[0].name, ...item, price: product[0].price, size: product[0].size, created: product.filter(i => i.created == month.month).slice(-1)[0].created, key: index }
        }) || [])
    }, [product])
    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async () => {
        try {
            const { product_code, quantity, color, ...rest } = form.getFieldValue()
            const { data: newData } = await Products.updateProduct(product_code, { history: { quantity, color, created: new Date().getMonth() + 1 } })
            setData(data.map(i => {
                if (i.product_code === newData.product_code) {
                    return {
                        ...i,
                        detail: newData.detail,
                        history: newData.history,
                        stock: newData.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0)

                    }
                } else return i
            }))
            console.log(newData.history.filter(i => i.created == month.month).slice(-1)[0])

            setNewProduct(newData.history.filter(i => i.created == month.month).slice(-1).map((item, index) => {
                return { ...item, product_code: newData.product_code, name: newData.name, size: newData.size, key: index, }
            }).map(item => {
                return item.detail.map((i, idx) => {
                    return { ...i, key: idx, product_code: item.product_code, name: item.name, size: item.size, price: item.price, created: item.created }
                })
            }).flat(Infinity))
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'product_code',
            width: '100px',

        },
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            width: '350px',

        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
            width: '100px',

        },
        {
            title: 'Kích cỡ',
            dataIndex: 'size',
            width: '100px',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            width: '150px',
            editable: true,
        },

        {
            title: 'Giá nhập',
            dataIndex: 'price',
            width: '150px',

        },
        {
            title: 'chỉnh sửa',
            dataIndex: 'operation',
            width: '150px',
            render: (_, record) => {
                const editable = isEditing(record);
                if (record.created == new Date().getMonth()) return null
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Lưu
                        </Typography.Link>
                        <Popconfirm title="Đồng ý?" onConfirm={cancel}>
                            <a>Huỷ</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Chỉnh sửa
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'quantity' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={newProduct}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};
export default ImportGoods