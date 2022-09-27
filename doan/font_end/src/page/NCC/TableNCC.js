import { Avatar, Table, Modal, Button, Form, Input, InputNumber, Popconfirm, Typography, Tooltip, Pagination } from 'antd';
import { useState } from 'react';
import Products from '../../services/productServices';
import InventoryNCC from './InventoryNCC';
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


const TableNCC = ({ data, setData }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [detail, setDetail] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [deletingKey, setDeletingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const isDeleting = (record) => record.key === deletingKey;

    const columns = [
        {
            title: 'Mã phiếu nhập',
            dataIndex: '_id',

        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            editable: true,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',

        },
        {
            title: 'Chi tiết phiếu nhập',
            dataIndex: '',
            render: (_, record) => {
                return <Button onClick={() => {
                    setVisible(true)
                    setDetail(record.detail)
                }}> Xem chi tiết</Button >
            }

        },

        {
            title: 'Ngày nhập',
            dataIndex: 'created',
            render: (_, record) => {
                return <p>{moment(record).utcOffset("+07:00").format("DD/MM/YYYY")}</p>;
            }

        },
        {
            title: 'Tên người gửi',
            dataIndex: 'deliver',

        },
        {
            title: 'Tên người nhận',
            dataIndex: 'receiver',

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
                        x: 1000,
                    }}
                />
            </Form>
            {/* <Pagination defaultCurrent={page} total={totalProduct} onChange={(value) => setPage(value)} /> */}
            <Modal
                title="Chi tiết phiếu nhập"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
                footer={null}
                maskClosable={false}
            >
                <InventoryNCC detail={detail} />
            </Modal>

        </div>

    );
}

export default TableNCC