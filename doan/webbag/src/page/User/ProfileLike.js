import React, { useState, useContext, useEffect } from 'react';
import '../../assets/css/profile-like.css'
import ProductItem from '../../components/ProductItem';
import { AuthContext } from '../../context/AuthContext';
import { Pagination } from 'antd';
import UserServives from "../../services/userServices"
import productServives from "../../services/productServices"
import Toast from "../../components/Toast"

const ProfileLike = () => {
    const [loading, setLoading] = useState(false)
    const { auth } = useContext(AuthContext)
    const [likes, setLikes] = useState([])
    const [product, setProduct] = useState([])
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                if (auth.id) {
                    const { data } = await UserServives.getUser(auth.id)
                    const productData = await productServives.getProducts({ page: 1, limit: 50000000 })
                    const { likeList } = data
                    setLikes(likeList)
                    setProduct(productData.data.map(item => {
                        return {
                            _id: item._id,
                            image: item.image[0].imageUrl,
                            imageBh: item.image[2].imageUrl,
                            name: item.name,
                            category: item.classify,
                            oldPrice: item.price,
                            price: item.price * (100 - item.discount) / 100,
                            discount: item.discount,
                            sold: item.sale,
                            stock: item.detail.reduce((acc, cur) => {
                                return acc + cur.quantity
                            }, 0)
                        }
                    }))
                }
            }
            catch (error) {
                Toast("error", error.message)
            }
            setLoading(false);
        }
        getData()
    }, [])



    if (loading) return <div>Loading....</div>
    return (
        <div>
            <div className='profile-like'>
                {product.filter(i => likes.includes(i._id)).map((item, index) => {
                    return <div key={index}>
                        <ProductItem data={item} noLike />
                    </div>
                })}

            </div>
            <div>

                <div className='profile-page'>
                    <Pagination simple defaultCurrent={2} total={50} />
                </div>
            </div>
        </div>
    )

}

export default ProfileLike