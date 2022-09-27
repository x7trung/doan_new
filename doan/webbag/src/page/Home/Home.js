import React, { useState, useEffect } from 'react'
import Banner from './Banner'
import SaleProduct from './SaleProduct'
import ProductPortfolio from './ProductPortfolio'
import PostItem from './Post'
import Introduce from './Introduce'
import ProductServices from '../../services/productServices'
const Home = () => {
    const [data, setData] = useState([])
    const [dataSale, setDataSale] = useState([])
    const [dataNew, setDataNew] = useState([])
    const [dataHot, setDataHot] = useState([])
    const [dataLike, setDataLike] = useState([])
    const [loading, setLoading] = useState(false)
    console.log(dataSale)
    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            try {
                const saleParams = {
                    limit: 15, page: 1, "discount[gt]": 0
                }
                const newParams = {
                    limit: 15, page: 1, sort: "-created"
                }
                const hotParams = {
                    limit: 15, page: 1, sort: "-sale"
                }
                const likeParams = {
                    limit: 15, page: 1, sort: "-like"
                }
                const saleData = await ProductServices.getProducts(saleParams)
                const newData = await ProductServices.getProducts(newParams)
                const hotData = await ProductServices.getProducts(hotParams)
                const likeData = await ProductServices.getProducts(likeParams)
                const data = await ProductServices.getProducts()
                setData(data.data.map(item => {
                    return {
                        _id: item._id,
                        product_code: item.product_code,
                        image: item?.image[0]?.imageUrl || '',
                        imageBh: item?.image[2]?.imageUrl || '',
                        name: item.name,
                        category: item.classify,
                        material: item.material,
                        gender: item.gender,
                        oldPrice: item.price,
                        price: item.price * (100 - item.discount) / 100,
                        discount: item.discount,
                        sold: item.sale,
                        stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0),
                        detail: item.detail,
                        like: item.like,
                    }
                }))
                setDataSale(saleData.data.map(item => {
                    return {
                        _id: item._id,
                        product_code: item.product_code,
                        image: item?.image[0]?.imageUrl || '',
                        imageBh: item?.image[2]?.imageUrl || '',
                        name: item.name,
                        material: item.material,
                        gender: item.gender,
                        category: item.classify,
                        stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }),
                        oldPrice: item.price,
                        price: item.price * (100 - item.discount) / 100,
                        discount: item.discount,
                        sold: item.sale, stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0),
                        detail: item.detail,
                        like: item.like,
                    }
                }))
                setDataNew(newData.data.map(item => {
                    return {
                        _id: item._id,
                        product_code: item.product_code,
                        image: item?.image[0]?.imageUrl || '',
                        imageBh: item?.image[2]?.imageUrl || '',
                        name: item.name,
                        material: item.material,
                        gender: item.gender,
                        category: item.classify,
                        oldPrice: item.price,
                        stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }),
                        price: item.price * (100 - item.discount) / 100,
                        discount: item.discount,
                        sold: item.sale, stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0),
                        detail: item.detail,
                        like: item.like,
                    }
                }))
                setDataHot(hotData.data.map(item => {
                    return {
                        _id: item._id,
                        product_code: item.product_code,
                        image: item?.image[0]?.imageUrl || '',
                        imageBh: item?.image[2]?.imageUrl || '',
                        name: item.name,
                        material: item.material,
                        gender: item.gender,
                        category: item.classify,
                        oldPrice: item.price,
                        stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }),
                        price: item.price * (100 - item.discount) / 100,
                        discount: item.discount,
                        sold: item.sale, stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0),
                        detail: item.detail,
                        like: item.like,
                    }
                }))
                setDataLike(likeData.data.map(item => {
                    return {
                        _id: item._id,
                        product_code: item.product_code,
                        image: item?.image[0]?.imageUrl || '',
                        imageBh: item?.image[2]?.imageUrl || '',
                        name: item.name,
                        category: item.classify,
                        material: item.material,
                        gender: item.gender,
                        oldPrice: item.price,
                        price: item.price * (100 - item.discount) / 100,
                        discount: item.discount,
                        sold: item.sale,
                        like: item.like,
                        stock: item.detail.reduce((acc, cur) => {
                            return acc + cur.quantity
                        }, 0),
                        detail: item.detail
                    }
                }))

            } catch (error) {
                console.log(error.message)
            }
            setLoading(false);

        }
        getData()
    }, [])

    if (loading) return <div>Loading ...</div>
    return (
        <div>
            <Banner />
            <SaleProduct data={dataSale} title="SẢN PHẨM KHUYẾN MÃI" desc="Hấp dẫn nhất" findBy="discount" noLike />
            <SaleProduct data={dataNew} title="SẢN PHẨM MỚI " desc="Mẫu sản phẩm mới nhất dẫn đầu xu hướng" findBy="created" noLike />
            <SaleProduct data={dataLike} title="SẢN PHẨM YÊU THÍCH NHẤT " desc="Năm nay" findBy="like" />
            <SaleProduct data={dataHot} title="SẢN PHẨM BÁN CHẠY NHẤT " desc="Liên tục cháy hàng" findBy="sale" noLike />
            <ProductPortfolio />
            {/* <div className="post-title">
                <h2>TIN TỨC</h2>
                <h4>Các tin tức mới nhất</h4>
            </div>
            <div className="post-news">
                {
                    dataPost.map((item, index) => {
                        return <div key={index} >
                            <PostItem data={item} />
                        </div>
                    })
                }
            </div> */}
            <Introduce />

        </div>
    )
}

export default Home