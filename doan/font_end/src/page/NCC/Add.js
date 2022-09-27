import React, { useState } from 'react'
import '../../assets/add.css'
import { useForm } from "react-hook-form";
import ImgUpload from '../../components/ImageUpload';
import Products from '../../services/productServices';

import { Button, Form, Input, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Toast from "../../components/Toast"


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 15,
    },
};
/* eslint-disable no-template-curly-in-string */

const Add = () => {


    const onFinish = async (values) => {
        if (values.detail) {
            values.detail.unshift({
                product_code: values.product_code, product_name: values.product_name, color: values.color, quantity: values.quantity, price: values.price, size: values.size, classify: values.classify, strap_type: values.strap_type, style_lock: values.style_lock, material: values.material, madeIn: values.madeIn, gender: values.gender,
                weight: values.weight, insurance: values.insurance
            })
        } else {
            values.detail = [{
                product_code: values.product_code, product_name: values.product_name, color: values.color, quantity: values.quantity, price: values.price, size: values.size, classify: values.classify, strap_type: values.strap_type, style_lock: values.style_lock, material: values.material, madeIn: values.madeIn, gender: values.gender,
                weight: values.weight, insurance: values.insurance
            }]
        }

        const { product_code, product_name, color, quantity, price, size, madeIn, gender, weight, insurance, ...rest } = values;
        const newImport = { ...rest }
        console.log(newImport)
        try {
            await Products.createProduct(newImport)
            Toast("success", "Nhập sản phẩm thành công!!!")

        } catch (error) {
            Toast("error", error.message)
        }
    };


    return (
        <Form name="dynamic_form_nest_item" autoComplete="on" onFinish={onFinish} {...layout}>
            <Form.Item
                label="NCC"
                name="name"
                rules={[{ required: true, message: 'Thiếu tên nhà cung cấp' }]}
                style={{
                    marginLeft: -550,
                }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Thiếu địa chỉ Email' }]}
                style={{
                    marginLeft: -550,
                }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Thiếu địa chỉ nhà cung cấp' }]}
                style={{
                    marginLeft: -550,
                }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="SĐT"
                name="phone"
                rules={[{ required: true, message: 'Thiếu số điện thoại' }]}
                style={{
                    marginLeft: -550,
                }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Người giao"
                name="deliver"
                rules={[{ required: true, message: 'Thiếu tên người giao hàng' }]}
                style={{
                    marginLeft: -550,
                }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Người nhận"
                name="receiver"
                rules={[{ required: true, message: 'Thiếu tên người nhận hàng' }]}
                style={{
                    marginLeft: -550,
                }}
            >
                <Input />
            </Form.Item>
            <Space
                style={{
                    display: 'flex',
                    marginBottom: 8,
                    flexWrap: 'wrap',
                    width: 1350,
                    marginLeft: 42,
                    gap: 15
                }}
                align="baseline"
            >
                <Form.Item
                    {...layout}
                    name={['product_code']}
                    label="Mã sp"
                    style={{
                        width: 230,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu mã sản phẩm',
                        },
                    ]}
                >
                    <Input placeholder="Nhập mã sản phẩm" />
                </Form.Item>
                <Form.Item
                    {...layout}
                    name={['product_name']}
                    label="Tên sp"
                    style={{
                        width: 230
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu tên sản phẩm',
                        },
                    ]}
                >
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Form.Item
                    {...layout}
                    name={['color']}
                    label="Màu sắc"
                    style={{
                        width: 230,
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
                    {...layout}
                    name={['quantity']}
                    label="Số lượng"
                    style={{
                        width: 230
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu số lượng',
                        },
                    ]}
                >
                    <InputNumber placeholder="Nhập số lượng" min={1} max={100} style={{
                        width: 143
                    }} />
                </Form.Item>
                <Form.Item
                    name={['size']}
                    label="Kích cỡ"
                    style={{
                        width: 230,

                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu kích cỡ',
                        },
                    ]}
                >
                    <Input placeholder="Nhập kích cỡ" />
                </Form.Item>
                <Form.Item
                    name={['classify']}
                    label="Loại túi"
                    style={{
                        width: 230,

                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu loại túi',
                        },
                    ]}
                >
                    <Input placeholder="Nhập loại túi" />
                </Form.Item>
                <Form.Item
                    name={['material']}
                    label="Chất liệu"
                    style={{
                        width: 230,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu chất liệu',
                        },
                    ]}
                >
                    <Input placeholder="Nhập chất liệu" />
                </Form.Item>
                <Form.Item
                    name={['style_lock']}
                    label="Kiểu khoá"
                    style={{
                        width: 230,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu kiểu khoá',
                        },
                    ]}
                >
                    <Input placeholder="Nhập kiểu khoá" />
                </Form.Item>
                <Form.Item
                    name={['strap_type']}
                    label="Loại dây"
                    style={{
                        width: 230,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu loại dây',
                        },
                    ]}
                >
                    <Input placeholder="Nhập loại dây" />
                </Form.Item>
                <Form.Item
                    name={['madeIn']}
                    label="Nơi sx"
                    style={{
                        width: 230,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu nơi sản xuất',
                        },
                    ]}
                >
                    <Input placeholder="Nhập nơi sản xuất" />
                </Form.Item>
                <Form.Item
                    name={['gender']}
                    label="Giới tính"
                    style={{
                        width: 230,
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu giới tính',
                        },
                    ]}
                >
                    <Input placeholder="Nhập giới tính" />
                </Form.Item>
                <Form.Item
                    name={['price']}
                    label="Giá nhập"
                    style={{
                        width: 230,

                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu giá nhập',
                        },
                    ]}
                >
                    <InputNumber placeholder="Nhập giá nhập" min={1} style={{
                        width: 143
                    }} />
                </Form.Item>
                <Form.Item
                    name={['weight']}
                    label="Cân nặng(kg)"
                    style={{
                        width: 230,

                    }}

                    rules={[
                        {
                            required: true,
                            message: 'Thiếu cân nặng',
                        },
                    ]}
                >
                    <InputNumber placeholder="Nhập cân nặng" step="0.1"
                        min={0} style={{
                            width: 143
                        }} />
                </Form.Item>
                <Form.Item
                    name={['insurance']}
                    label="Bảo hành"
                    style={{
                        width: 230,

                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Thiếu thời gian bảo hành',
                        },
                    ]}
                >
                    <InputNumber placeholder="Nhập thười gian bảo hành" min={1} style={{
                        width: 143
                    }} />
                </Form.Item>
                <MinusCircleOutlined style={{ cursor: "no-drop", color: "#cccccc" }} />
            </Space>
            <Form.List name="detail" >
                {(fields, { add, remove }) => (
                    <>

                        {fields.map(({ key, name, ...restField }) => (
                            <Space
                                key={key}
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    marginBottom: 8,
                                    width: 1350,
                                    marginLeft: 42,
                                    gap: 15,


                                }}
                                align="baseline"
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'product_code']}
                                    label="Mã sp"
                                    style={{
                                        width: 230,
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu mã sản phẩm',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập mã sản phẩm" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'product_name']}
                                    label="Tên sp"
                                    style={{
                                        width: 230,

                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu tên sản phẩm',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập tên sản phẩm" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'color']}
                                    label="Màu sắc"
                                    style={{
                                        width: 230,
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
                                        width: 230,

                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu số lượng',
                                        },
                                    ]}
                                >
                                    <InputNumber placeholder="Nhập số lượng" min={1} max={100} style={{
                                        width: 143
                                    }} />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'size']}
                                    label="Kích cỡ"
                                    style={{
                                        width: 230,

                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu kích cỡ',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập kích cỡ" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'classify']}
                                    label="Loại túi"
                                    style={{
                                        width: 230,

                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu loại túi',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập loại túi" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'material']}
                                    label="Chất liệu"
                                    style={{
                                        width: 230,

                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu chất liệu',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập chất liệu" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'style_lock']}
                                    label="kiểu khoá"
                                    style={{
                                        width: 230,

                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu kiểu khoá',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập kiểu khoá" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'strap_type']}
                                    label="Loại dây"
                                    style={{
                                        width: 230,

                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu loại dây',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập loại dây" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'madeIn']}
                                    label="Nơi sx"
                                    style={{
                                        width: 230,

                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu nơi sản xuất',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập nơi sản xuất" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'gender']}
                                    label="Giới tính"
                                    style={{
                                        width: 230,

                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu giới tính',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập giới tính" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'price']}
                                    label="Giá nhập"
                                    style={{
                                        width: 230
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu giá nhập',
                                        },
                                    ]}
                                >
                                    <InputNumber placeholder="Nhập giá nhập" min={1} style={{
                                        width: 143
                                    }} />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'weight']}
                                    label="Cân nặng"
                                    style={{
                                        width: 230
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu cân nặng',
                                        },
                                    ]}
                                >
                                    <InputNumber placeholder="Nhập cân nặng" min={1} style={{
                                        width: 143
                                    }} />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'insurance']}
                                    label="Bảo hành"
                                    style={{
                                        width: 230
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thiếu thời gian bảo hành',
                                        },
                                    ]}
                                >
                                    <InputNumber placeholder="Nhập thời gian bảo hành" min={1} style={{
                                        width: 143
                                    }} />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ marginLeft: 500, width: 250 }}>
                                Thêm số lượng và màu sắc
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>


            <Form.Item style={{ textAlign: "center", marginLeft: 220 }}>
                <Button type="primary" htmlType="submit">
                    Thêm sản phẩm
                </Button>
            </Form.Item>
        </Form>


    )
}

export default Add