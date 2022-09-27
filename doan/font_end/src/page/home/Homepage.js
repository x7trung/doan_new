import React, { useEffect, useState } from 'react'
import Overview from './Overview'
import Paradigm from './Paradigm'
import Topproduct from './Topproduct'
import { MdOutlineMonetizationOn } from 'react-icons/md';
import { BsCartCheck } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiProductHuntLine } from 'react-icons/ri';
import Products from '../../services/productServices';
import Toast from "../../components/Toast"
import Topproduct_gender from './Topproduct_gender';
import Topproduct_like from './Topproduct_like';
import ProductServices from '../../services/productServices'
const Homepage = () => {
    const [dataview, setDataview] = useState([
        {
            title: "TỔNG THU NHẬP",
            money: "504.260.000đ",
            view: "Xem thu thâp",
            icon: <div className='card-icon_icon' style={{ color: "rgb(11, 127, 127)", backgroundColor: "rgba(10, 179, 156, .18)" }}>
                <MdOutlineMonetizationOn />
            </div>,
            link: "/"

        },
        {
            title: "ĐƠN HÀNG",
            money: "1270",
            view: "Xem tất cả đơn hàng",
            icon: <div className='card-icon_icon' style={{ color: "#3577f1", backgroundColor: "rgba(41,156,219,.18)" }}>
                <BsCartCheck />
            </div>,
            link: "order"
        },
        {
            title: "KHÁCH HÀNG",
            money: "120",
            view: "xem tất cả khách hàng",
            icon: <div className='card-icon_icon' style={{ color: "#f7b84b", backgroundColor: "RGB(254, 241, 222)" }}>
                <FaRegUserCircle />
            </div>,
            link: "user"
        },
        {
            title: "SẢN PHẨM",
            money: "479",
            view: "Xem tất cả sản phẩm",
            icon: <div className='card-icon_icon' style={{ color: "#5d698d", backgroundColor: "RGB(221, 223, 235)" }}>
                <RiProductHuntLine />
            </div>,
            link: "product"
        },
        {
            title: "LỢI NHUẬN",
            money: "479",
            view: "Xem lợi nhuận",
            icon: <div className='card-icon_icon' style={{ color: "#5d698d", backgroundColor: "RGB(221, 223, 235)" }}>
                <MdOutlineMonetizationOn />
            </div>,
            link: "product"
        },
    ])
    const [loading, setLoading] = useState(false)
    const [revenue, setRevenue] = useState([])
    const [dataTopProduct, setDataTopProduct] = useState([])
    const [dataProductSale, setDataProductSale] = useState([])
    const [dataProductMate, setDataProductMate] = useState([])
    const [dataProductLike, setDataProductLike] = useState([])
    const [type, setType] = useState('week');
    const [time, setTime] = useState(31)
    //đây r dùng biến ở đâu thì tuỳ m
    const [moneyMate, setMoneyMate] = useState(0)


    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const likeParams = {
                    limit: 15, page: 1, sort: "-like"
                }

                const dataIncome = await Products.totalIncome()
                const dataRevenue = await Products.totalRevenue(type, { time })
                const dataTop = await Products.topProduct()
                const likeData = await ProductServices.getProducts(likeParams)
                const data = await ProductServices.getProducts()
                setDataTopProduct(dataTop.dataProduct.map((item, index) => {
                    return { ...item, key: index }
                }))
                //đây
                setMoneyMate(dataTop.totalMoney)
                //
                setDataProductSale(dataTop.productSaleToDay.map((item, index) => {
                    return { ...item, key: index }
                }))
                setDataProductMate(dataTop.productByMaterial.map((item, index) => {
                    return { ...item, key: index }
                }))
                setDataProductLike(likeData.data.map((item, index) => {
                    return { ...item, key: index }
                }))

                setDataview(dataview.map((i, idx) => {
                    return { ...i, money: dataIncome.data[idx] }
                }))
                setRevenue(dataRevenue.data)
            } catch (error) {
                Toast("error", error.message)
            }

            setLoading(false)
        }
        getData()
    }, [time])


    if (loading) return <div>Loading ...</div>
    return (
        <div>
            <Overview dataview={dataview} />
            <Paradigm data={revenue} type={type} setType={setType} time={time} setTime={setTime} />
            <Topproduct dataTopProduct={dataTopProduct} dataProductSale={dataProductSale} />
            <Topproduct_gender dataProductMate={dataProductMate} />

        </div>
    )
}

export default Homepage