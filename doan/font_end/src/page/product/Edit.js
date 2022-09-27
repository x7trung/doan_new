import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    Upload,
    InputNumber,
} from 'antd';
import ImgUpload from '../../components/ImageUpload';
import Products from '../../services/productServices';
import _ from "lodash";
import Toast from '../../components/Toast';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const { TextArea } = Input;

const Edit = ({ editProduct }) => {
    const [fileList, setFileList] = useState([]);
    const [describe, setDescribe] = useState("");
    const [fields, setFields] = useState();

    useEffect(() => {
        setDescribe(editProduct.describe || "")
        setFields([
            {
                name: "name",
                value: editProduct.name,
            },
            {
                name: "discount",
                value: editProduct.discount,
            },
            {
                name: "price",
                value: editProduct.price,
            },
            {
                name: "origin_price",
                value: editProduct.origin_price,
            },
            {
                name: "insurance",
                value: editProduct.insurance,
            },
        ])
        setFileList(editProduct.image.map(img => { return { url: img } }))
    }, [editProduct])

    const onFinish = async (values) => {
        console.log(values)
        try {
            await Products.updateProduct(editProduct.product_code, { ...values, describe })
            const imageValid = fileList.filter((file) => !file.url).length;
            if (imageValid > 0) {
                const formData = new FormData();
                _.forEach(fileList, (file) => {
                    if (!file.url) formData.append("image", file.originFileObj);
                });
                await Products.uploadImages(editProduct._id, formData);
            }
            Toast("success", "Cập nhật sản phẩm thành công")
        } catch (error) {
            Toast("error", error.message)
        }

    };


    return (
        <div>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onFinish={onFinish}
                fields={fields}
            // onValuesChange={onFormLayoutChange}

            >

                <Form.Item label="Tên sản phẩm" name="name" value={editProduct.name} rules={[{ required: true, message: 'Ô tên sản phẩm không được để trống!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Bảo hành" name="insurance" value={editProduct.insurance} rules={[{ required: true, message: 'Ô tên sản phẩm không được để trống!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Giảm giá " name="discount" rules={[{ required: true, message: 'Ô giảm giá không được để trống!' }]}>
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item label="Giá bán " name="price" rules={[{ required: true, message: 'Ô giá bán không được để trống!' }]}>
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item label="Giá nhập" name="origin_price" rules={[{ required: true, message: 'Ô giá bán không được để trống!' }]}>
                    <InputNumber min={1} disabled />
                </Form.Item>
                <Form.Item label="Mô tả" rules={[{ required: true, message: 'Ô giá bán không được để trống!' }]}>
                    <CKEditor
                        editor={ClassicEditor}
                        data={describe}
                        onChange={(_, editor) => {
                            const data = editor.getData();
                            setDescribe(data);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Image"
                    rules={[{ required: true, message: 'Please input your image!' }]}
                    style={{
                        width: 1000,
                        marginLeft: -60
                    }}
                >
                    <ImgUpload
                        fileList={fileList}
                        setFileList={setFileList}
                        length={5}
                    />
                </Form.Item>
                <Form.Item >
                    <Button htmlType="submit">Chỉnh sửa</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Edit