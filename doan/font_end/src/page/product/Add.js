import React, { useState } from 'react'
import '../../assets/add.css'
import { useForm } from "react-hook-form";
import ImgUpload from '../../components/ImageUpload';
import Products from '../../services/productServices';
import _ from "lodash";
import { Button, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Item from 'antd/lib/list/Item';

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */

const Add = () => {
    const [fileList, setFileList] = useState([]);

    const onFinish = async (values) => {
        if (values.detail) {
            if (values.detail.filter(i => i.color == values.color))
                values.detail.push({ color: values.color, quantity: Number(values.quantity) })
            delete values.color
            delete values.quantity
        } else {
            values.detail = [{ color: values.color, quantity: Number(values.quantity) }]
            delete values.color
            delete values.quantity
        }
        try {
            const res = await Products.createProduct(values)
            const imageValid = fileList.filter((file) => !file.url).length;
            if (imageValid > 0) {
                const formData = new FormData();
                _.forEach(fileList, (file) => {
                    if (!file.url) formData.append("image", file.originFileObj);
                });
                await Products.uploadImages(res.data._id, formData);
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <Form name="dynamic_form_nest_item" autoComplete="off" onFinish={onFinish} {...layout}>
            <Form.Item
                label="Mã sản phẩm"
                name="product_code"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="kích cỡ"
                name="size"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Phân loại"
                name="classify"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Giá tiền"
                name="price"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Space
                style={{
                    display: 'flex',
                    marginBottom: 8,
                    width: "100%",
                    marginLeft: 120
                }}
                align="baseline"
            >
                <Form.Item
                    {...layout}
                    name={['color']}
                    label="Màu sắc"
                    style={{
                        width: 370
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu màu sắc',
                        },
                    ]}
                >
                    <Input placeholder="Nhập màu sắc" />
                </Form.Item>
                <Form.Item
                    name={['quantity']}
                    label="Số lượng"
                    style={{
                        width: 370
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu số lượng',
                        },
                    ]}
                >
                    <Input placeholder="Nhập số lượng" />
                </Form.Item>
                <MinusCircleOutlined style={{ cursor: "no-drop", color: "#cccccc", marginLeft: -40 }} />
            </Space>
            <Form.List name="detail" >
                {(fields, { add, remove }) => (
                    <>

                        {fields.map(({ key, name, ...restField }) => (
                            <Space
                                key={key}
                                style={{
                                    display: 'flex',
                                    marginBottom: 8,
                                    marginLeft: 120
                                }}
                                align="baseline"
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'color']}
                                    label="Màu sắc"
                                    style={{
                                        width: 370
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu màu sắc',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập màu sắc" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'quantity']}
                                    label="Số lượng"
                                    style={{
                                        width: 370
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu số lượng',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập số lượng" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: -40 }} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ marginLeft: 300, width: 300 }}>
                                Thêm số lượng và màu sắc
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            {/* <Form.Item
                label="Mô tả"
                name="describe"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item> */}
            <Form.Item
                label="Nhà cung cấp"
                name="nameNCC"
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
                label="Image"
                rules={[{ message: 'Please input your image!' }]}
            >
                <ImgUpload
                    fileList={fileList}
                    setFileList={setFileList}
                    length={5}
                />
            </Form.Item>
            <Form.Item style={{ textAlign: "center", marginLeft: 220 }}>
                <Button type="primary" htmlType="submit">
                    Thêm sản phẩm
                </Button>
            </Form.Item>
        </Form>


    )
}

export default Add