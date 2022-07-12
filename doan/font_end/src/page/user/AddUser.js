import React, { useState } from 'react'
import '../../assets/add.css'
import ImgUpload from '../../components/ImageUpload';
import _ from "lodash";
import { Button, DatePicker, Form, Input, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import User from '../../services/userServices'


const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
const AddUser = () => {
    const [fileList, setFileList] = useState([]);

    const onFinish = async (values) => {
        try {
            const res = await User.createUser(values)
            const imageValid = fileList.filter((file) => !file.url).length;
            if (imageValid > 0) {
                const formData = new FormData();
                _.forEach(fileList, (file) => {
                    if (!file.url) formData.append("image", file.originFileObj);
                });
                await User.uploadImages(res.data._id, formData);
            }
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <Form name="dynamic_form_nest_item" autoComplete="off" onFinish={onFinish} {...layout}>
            <Form.Item
                label="Tên người dùng"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Ngày sinh"
                name="birth"
            // rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                label="Giới tính"
                name="sex"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Radio.Group >
                    <Radio value="nam">Nam</Radio>
                    <Radio value="nữ">Nữ</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Quyền"
                name="role"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Radio.Group >
                    <Radio value={1}>User</Radio>
                    <Radio value={2}>Admin</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Image"
                rules={[{ message: 'Please input your image!' }]}
            >
                <ImgUpload
                    fileList={fileList}
                    setFileList={setFileList}
                    length={1}
                />
            </Form.Item>
            <Form.Item style={{ textAlign: "center", marginLeft: 220 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddUser