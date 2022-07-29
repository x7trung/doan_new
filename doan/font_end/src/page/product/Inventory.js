import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { useState } from 'react';
const originData = [];

for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

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

const Inventory = ({ product }) => {
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



    const columns = [
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
            title: 'Hàng tồn',
            dataIndex: 'quantity',
            width: '150px',

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
                dataSource={product}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};
export default Inventory