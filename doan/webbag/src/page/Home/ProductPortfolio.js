import React from 'react'
import '../../assets/css/product.css'
import { Link } from 'react-router-dom';

const ProductPortfolio = () => {
    return (
        <div className="prot">
            <div className="protfoLio-title">
                <h2>DANH MỤC SẢN PHẨM</h2>
                <h4>Cùng nhau chiêm ngưỡng danh mục sản phẩm của shop</h4>
            </div>
            <div className="product-protfolio">

                <div className="protfolio-one overlay">
                    <img src="https://muagitot.com/images/news/2022/04/02/large/277852416_1282203618974502_8024857290475138342_n_1648911426.jpg" alt="" />
                    <Link to="/product-list?list=0">
                        <button className="protfolio-btn">Tất cả sản phẩm</button>
                    </Link>
                </div>
                <div className="protfolio-two overlay">
                    <img src="https://welclick.com/uploads/images/202110/img_1920x_6178cb58d396a2-56198775-13833636.jpg" alt="" />
                    <Link to="/product-list">
                        <button className="protfolio-btn">Túi cầm tay</button>
                    </Link>
                </div>
                <div className="protfolio-three overlay">
                    <img src="https://cf.shopee.vn/file/9aaee58fdadebe12655f9a6f6638aa86" alt="" />
                    <Link to="/product-list?list=1">
                        <button className="protfolio-btn">Túi đeo chéo</button>
                    </Link>
                </div>
                <div className="protfolio-four overlay">
                    <img src="https://bizweb.dktcdn.net/100/295/303/files/tui-deo-vai-nu-han-quoc-tui-deo-vai-nu-hang-hieu-gia-re-txc2792-6.jpg?v=1552560186867" alt="" />
                    <Link to="/product-list">
                        <button className="protfolio-btn">Túi đeo vai</button>
                    </Link>
                </div>
                <div className="protfolio-five overlay">
                    <img src="https://dathangtaobao.vn/wp-content/uploads/2020/09/san-pham-tui-vi-ban-chay-nhat-shopee-14.jpg" alt="" />
                    <Link to="/product-list">
                        <button className="protfolio-btn">Túi ví</button>
                    </Link>
                </div>
                <div className="protfolio-six overlay">
                    <img src="http://tuivaivietnhat.com/wp-content/uploads/2021/06/tui-tote-han-quoc.jpg" alt="" />
                    <Link to="/product-list">
                        <button className="protfolio-btn">Túi tote</button>
                    </Link>
                </div>
                <div className="protfolio-sevent overlay">
                    <img src="https://media3.scdn.vn/img3/2019/6_25/K8WFsr.jpg" alt="" />
                    <Link to="/product-list">
                        <button className="protfolio-btn">Túi đeo hông</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductPortfolio