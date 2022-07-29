import { Space, Table, Button, Modal, Form, Input, DatePicker, Radio, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import ImgUpload from '../../components/ImageUpload';
import _ from "lodash";
import UserOrders from './UserOrders';
const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};



const TableUser = ({ data, total, page, setPage }) => {
    const [fileList, setFileList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [formValue, setFormValue] = useState({});
    const [disabled, setDisabled] = useState(true)
    const [visibleA, setVisibleA] = useState(false)
    const [userOrders, setUserOrders] = useState([])
    useEffect(() => form.resetFields(), [formValue]);
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: 'id',
            width: 200
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Thông tin người dùng',
            dataIndex: 'address',
            key: 'address',
            render: (_, record) => {

                return <Button onClick={() => {
                    setVisible(true);
                    setFormValue(record)
                }}>Xem chi tiết</Button>
            },
        },
        {
            title: 'Sản phẩm đã mua',
            key: 'order',
            dataIndex: 'order',
            render: (_, record) => <Button onClick={() => {
                setVisibleA(true);
                setUserOrders(record.orders)
            }

            }>Xem chi tiết</Button>,
        },

        {
            title: 'Xoá người dùng',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const onFinish = async (values) => { };

    return (
        <div>
            <>
                <Table columns={columns} dataSource={data} pagination={false} />;
                <Pagination defaultCurrent={page} total={total} onChange={(value) => setPage(value)} />
            </>
            <>
                <Modal
                    title="Thông tin người dùng"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={null}
                    maskClosable={false}
                >
                    <Form name="dynamic_form_nest_item" autoComplete="off" onFinish={onFinish} {...layout} initialValues={formValue} form={form}>
                        <Form.Item
                            label="Tên người dùng"
                            name="name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input disabled={disabled} />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input disabled={disabled} />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input disabled={disabled} />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input disabled={disabled} />
                        </Form.Item>
                        <Form.Item
                            label="Ngày sinh"
                        // name="birth"
                        // rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker disabled={disabled} />
                        </Form.Item>
                        <Form.Item
                            label="Giới tính"
                            name="sex"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Radio.Group disabled={disabled}>
                                <Radio value="nam">Nam</Radio>
                                <Radio value="nữ">Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Quyền"
                            name="role"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Radio.Group disabled={disabled}>
                                <Radio value={1}>User</Radio>
                                <Radio value={2}>Admin</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item style={{ textAlign: "center", marginLeft: 220 }}>
                            {
                                disabled ? <Button type="primary" onClick={() => setDisabled(false)}>
                                    Chỉnh sửa thông tin
                                </Button> :
                                    <>
                                        <Button type="primary" onClick={() => setDisabled(true)} style={{ marginRight: 15 }}>
                                            Huỷ bỏ
                                        </Button>
                                        <Button type="primary" htmlType="submit">
                                            Lưu
                                        </Button>
                                    </>
                            }
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="Modal 1000px width"
                    centered
                    visible={visibleA}
                    onOk={() => setVisibleA(false)}
                    onCancel={() => setVisibleA(false)}
                    footer={null}
                    width={900}
                >
                    <UserOrders setUserOrders={setUserOrders} userOrders={userOrders} />
                </Modal>
            </>
        </div>

    )
}

export default TableUser


