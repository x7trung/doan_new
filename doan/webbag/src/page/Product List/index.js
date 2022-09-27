import React, { useState, useEffect } from 'react'
import FilterWrapper from './FilterWrapper'
import '../../assets/css/filter.css'
import FilterByProduct from './FilterByProduct'
import ProductServices from '../../services/productServices'
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const ProductList = () => {
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchNum, setSearchNum] = useState(0)
    const search = useLocation().search;
    const list = new URLSearchParams(search).get('list');
    const searchBy = new URLSearchParams(search).get('search');
    const [searchByName, setSearchByName] = useState(new URLSearchParams(search).get('name') || "")
    const [searchByNameNCC, setSearchByNameNCC] = useState(new URLSearchParams(search).get('nameNCC') || "")
    const [searchText, setSearchText] = useState("")
    const [selectPrice, setSelectPrice] = useState([1000, 10000])
    const [selectSize, setSelectSize] = useState("")
    const [selectColor, setSelectColor] = useState("")
    const [sortBy, setSortBy] = useState("")
    const [material, setMaterial] = useState("")
    const [straptype, setStraptype] = useState("")
    const [expand, setExpand] = useState(true)
    const [gender, setGender] = useState("")
    useEffect(() => {
        setSearchNum(Number(list))
    }, [list])
    useEffect(() => {
        setSearchText(searchBy)
    }, [searchBy])

    const filterList = [
        'Tất cả sản phẩm',
        'Túi đeo chéo',
        'Túi cầm tay',
        'Túi đeo vai',
        'Túi ví',
        'Túi tote'
    ];

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                console.log(sortBy)
                const findKey = searchText == "discount" ? searchText + "[gt]" : "sort"
                const findValue = searchText == "discount" ? 0 : "-" + searchText
                let saleParams
                if (searchText == "discount") {
                    saleParams = {
                        limit: 12, page: page,
                        "classify[regex]": filterList[searchNum] == "Tất cả sản phẩm" ? "" : filterList[searchNum],
                        "name[regex]": searchByName,
                        "nameNCC[regex]": searchByNameNCC,
                        "price[gte]": selectPrice[0] * 1000,
                        "price[lte]": selectPrice[1] * 1000,
                        "size[regex]": selectSize || "",
                        "options": "i",
                        "sort": sortBy ? "-" + sortBy : "",
                        "material[regex]": material,
                        "gender[regex]": gender,
                        // "strap_type[regex]": straptype,
                        "detailColor[elemMatch]": selectColor || "",
                        [findKey]: findValue
                    }
                } else {
                    saleParams = {
                        limit: 12, page: page,
                        "classify[regex]": filterList[searchNum] == "Tất cả sản phẩm" ? "" : filterList[searchNum],
                        "name[regex]": searchByName,
                        "nameNCC[regex]": searchByNameNCC,
                        "price[gte]": selectPrice[0] * 1000,
                        "price[lte]": selectPrice[1] * 1000,
                        "size[regex]": selectSize || "",
                        "options": "i",
                        "sort": sortBy ? "-" + sortBy : "",
                        "material[regex]": material,
                        "gender[regex]": gender,
                        // "strap_type[regex]": straptype,
                        "detailColor[elemMatch]": selectColor || "",

                    }
                }

                console.log(saleParams)

                const { data, count } = await ProductServices.getProducts(saleParams)
                setTotal(Math.round(count / 12))
                setData(data.map(item => {
                    return {
                        _id: item._id,
                        image: item?.image[0]?.imageUrl || '',
                        imageBh: item?.image[2]?.imageUrl || '',
                        name: item.name,
                        category: item.classify,
                        oldPrice: item.price,
                        price: item.price * (100 - item.discount) / 100,
                        discount: item.discount,
                        sold: item.sale
                    }
                }))

            } catch (error) {
                console.log(error.message)
            }
            setLoading(false);

        }
        getData()
    }, [page, searchNum, list, setSearchNum, selectPrice, selectSize, sortBy, material, selectColor, searchText, searchByName, searchByNameNCC, gender, straptype])


    if (loading) return <div>Loading...</div>
    return (
        <div className="filter">
            <FilterWrapper setSelectPrice={setSelectPrice} setSelectSize={setSelectSize} setSortBy={setSortBy} setMaterial={setMaterial} setSelectColor={setSelectColor} setExpand={setExpand} expand={expand} setGender={setGender} setStraptype={setStraptype} />
            <FilterByProduct data={data} total={total} page={page} setPage={setPage} filterList={filterList} searchNum={searchNum} setSearchNum={setSearchNum} />
        </div>

    )
}

export default ProductList