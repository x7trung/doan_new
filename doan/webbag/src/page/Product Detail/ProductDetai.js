import React, { useState, useEffect, useContext } from 'react'
import Slide from './Slide'
import Detail from './Detail'
import '../../assets/css/productdetail.css'
import ProductDescribe from './ProductDescribe'
import { BsFacebook } from 'react-icons/bs';
import { BsMessenger } from 'react-icons/bs';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { SiTiktok } from 'react-icons/si';
import SaleProduct from '../Home/SaleProduct'
import ProductServices from '../../services/productServices'
import userServices from '../../services/userServices'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Toast from '../../components/Toast'

const ProductDetai = () => {
    const { auth } = useContext(AuthContext)
    const [productImages, setProductImages] = useState([]);
    const [data, setData] = useState([])
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [liked, setLiked] = useState(false)
    const { id } = useParams()
    const [recommend, setRecommend] = useState([])
    console.log(recommend)

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            try {
                let params

                const { data } = await ProductServices.getProducts()
                const product = await ProductServices.getProductById(id)

                if (product.data.discount > 0) {
                    params = { limit: 15, page: 1, "classify[regex]": product.data.classify, "discount[gt]": 0 }
                } else {
                    params = { limit: 15, page: 1, "classify[regex]": product.data.classify }
                }
                const { data: recomend } = await ProductServices.getProducts(params)
                setRecommend(recomend.map(item => {
                    return {
                        _id: item._id,
                        image: item.image[0].imageUrl,
                        imageBh: item.image[2].imageUrl,
                        name: item.name,
                        material: item.material,
                        gender: item.gender,
                        category: item.classify,
                        oldPrice: item.price,
                        price: item.price * (100 - item.discount) / 100,
                        sold: item.sale,
                        like: item.like,

                    }
                }))
                if (auth.id) {
                    const user = await userServices.getUser(auth.id)
                    setLiked(user.data.likeList.includes(id))

                }


                setProductImages(product.data.image.map(i => i.imageUrl))
                setProduct({
                    ...product.data, oldPrice: product.data.price,
                    price: product.data.price * (100 - product.data.discount) / 100, like: product.data.like, rate: Math.round(product.data.comments.reduce((acc, cur) => {
                        return acc + cur.rate;
                    }, 0) / product.data.comments.length / 0.5) * 0.5, vote: product.data.comments.length
                })
                setData(data.slice(0, 19).map(item => {
                    return {
                        _id: item._id,
                        image: item.image[0].imageUrl,
                        imageBh: item.image[2].imageUrl,
                        name: item.name,
                        material: item.material,
                        gender: item.gender,
                        category: item.classify,
                        oldPrice: item.price,
                        price: item.price * (100 - item.discount) / 100,
                        sold: item.sale,
                    }
                }))

            } catch (error) {
                console.log(error.message)
            }
            setLoading(false);

        }
        getData()
    }, [id])

    const handleLike = async () => {
        try {
            await userServices.addToLike(auth.id, { idProduct: id })
            setLiked(true)
            setProduct({ ...product, like: product.like + 1 })
        } catch (error) {
            Toast("error", error.message)
        }
    }
    const handleDisLike = async () => {
        try {
            await userServices.removeFromLike(auth.id, { idProduct: id })

            setLiked(false)
            setProduct({ ...product, like: product.like - 1 })
        } catch (error) {
            Toast("error", error.message)
        }
    }






    if (loading) return <div>Loading...</div>
    return (
        <div>

            <div className='ProductDetai'>
                <div className='slide' >

                    <Slide images={productImages} />
                    <div className='productdetail-icon'>
                        <div className='productdetail-icon_page'>
                            <h3>FanPage Shop:</h3>
                            <div className='icon-page fb'>
                                <BsFacebook />
                            </div>
                            <div className='icon-page mess'>
                                <BsMessenger />
                            </div>
                            <div className='icon-page tiktok'>
                                <SiTiktok />
                            </div>
                        </div>
                        <div className='productdetail-icon_like'>
                            {liked ? <BsSuitHeartFill className='icon_like' style={{ color: "red" }} onClick={handleDisLike} /> : <BsSuitHeart className='icon_like' onClick={handleLike} />}
                            <h3>Đã thích({product.like})</h3>
                        </div>
                    </div>
                </div>
                <Detail product={product} />
            </div>
            <div className='ProductDetail-Des'>

                <ProductDescribe product={product} />

            </div>
            <div>
                <SaleProduct data={recommend} title="SẢN PHẨM TƯƠNG TỰ KHÁC CỦA SHOP" desc="sản phẩm tương tự" noLike />
            </div>
        </div>

    )
}

export default ProductDetai