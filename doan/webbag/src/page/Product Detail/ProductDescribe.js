import React from 'react'
import { Tabs } from 'antd';
import CommentProduct from './CommentProduct';
import ReactHtmlParser from "react-html-parser";




const { TabPane } = Tabs;
const onChange = (key) => {
    console.log(key);
};

const ProductDescribe = ({ product }) => {
    return (
        <div>

            <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="Mô tả sản phẩm" key="1">
                    {ReactHtmlParser(product.describe)}
                    {/* <div dangerouslySetInnerHTML={{ _html: product.describe }}>
                    </div> */}
                </TabPane>
                <TabPane tab="đánh giá sản phẩm" key="2">
                    <CommentProduct product={product} />
                </TabPane>
                <TabPane tab="Quy định đổi hàng" key="3">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </div>
    )
}

export default ProductDescribe