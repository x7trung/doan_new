import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { useState } from 'react';



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

const ImportGoods = ({ product }) => {
    console.log(product)
    const newProduct = product.map(item => {
        return item.detail.map((i, idx) => {
            return { ...i, key: idx, product_code: item.product_code, name: item.name, size: item.size, price: item.price, created: item.created }
        })
    }).flat(Infinity)
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const saveData = form.getFieldValue()
            delete saveData.key


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
                if (new Date(record.created).getMonth() !== new Date().getMonth()) return null
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