import { Form, InputNumber, Popconfirm, Table, Typography, Input, Button, Select, Tooltip, Modal } from 'antd';
import { useState } from 'react';
import DetailOrder from './DetailOrder';
const { Option } = Select;


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
    const inputNode = inputType === 'select' ? <Select
        style={{
            width: 200,
        }}
    >
        <Option value="jack">Chờ xác nhận</Option>
        <Option value="lucy">Đang giao hàng</Option>
        <Option value="lucy">Giao hàng thành công</Option>

    </Select> : inputType === 'selectPay' ? <Select
        style={{
            width: 100,
        }}
    >
        <Option value="jack">Online</Option>

    </Select> : inputType === 'number' ? <InputNumber min={0} max={20} step={5} /> : <Input />;
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

const TableOrder = ({ data }) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [deletingKey, setDeletingKey] = useState('');
    const [visible, setVisible] = useState(false);
    const isEditing = (record) => record.key === editingKey;
    const isDeleting = (record) => record.key === deletingKey;
    const [product, setProduct] = useState([])

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
        setDeletingKey("")
    };

    const cancelEdit = () => {
        setEditingKey('');

    };
    const cancelDelete = () => {
        setDeletingKey('');
    };
    const deleteOrder = async (key) => {
        // setData(data.filter(item => item.key !== key))
        setDeletingKey('');
        setEditingKey("");
    };

    const save = async (key) => {

    };

    const columns = [
        {
            title: 'id người dùng',
            dataIndex: '_id',
            width: 200,
            fixed: "left",
            render: (id) => {
                return <Tooltip title={id}>{id.slice(0, 20)}...</Tooltip>
            }
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            width: 170,
            editable: true,
            fixed: "left"
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: 250,
            editable: true,
        },
        {
            title: 'Đơn hàng',
            dataIndex: 'detail',
            width: 150,
            render: (_, record) => {
                console.log(record.product)
                return <Button onClick={() => {
                    setVisible(true)
                    setProduct(record.product)
                }}> Xem chi tiết</Button >

            },
        },
        {
            title: 'Giảm giá',
            dataIndex: 'voucher',
            width: 100,
            // editable: true,

        },
        {
            title: 'Phi ship',
            dataIndex: 'ship',
            width: 100,
            render: (num) => {
                console.log(num)
                return <p>{Number(num).toLocaleString()}đ</p>
            }

        },
        {
            title: 'Thanh toán',
            dataIndex: 'paymenttype',
            width: 130,
            editable: true,

        },
        {
            title: 'Tổng tiền',
            dataIndex: 'amount',
            width: 130,
            render: (num) => {
                return <p>{Number(num).toLocaleString()}đ</p>
            }

        },
        {
            title: 'Ngày đặt',
            dataIndex: 'oderdate',
            width: 130,
        },
        {
            title: 'Ngày nhận',
            dataIndex: 'receiveddate',
            width: 130,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'state',
            width: 250,
            editable: true,
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
                            Lưu
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancelEdit}>
                            <a>Huỷ</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Chỉnh sửa
                        </Typography.Link>
                    </>
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
                            onClick={() => deleteOrder(record.key)}
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
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'state' ? 'select' : col.dataIndex === 'voucher' ? "number" : col.dataIndex === 'paymenttype' ? "selectPay" : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                deleting: isDeleting(record),
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
                        x: 2000,
                    }}

                />
            </Form>

            <Modal
                title="Sản phẩm đặt hàng"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1400}
            >
                <DetailOrder product={product} />
            </Modal>
        </div>
    );
};

export default TableOrder;