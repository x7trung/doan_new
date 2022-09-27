import React, { useEffect, useState } from 'react'
import { Divider, List, Typography } from 'antd';
import '../../assets/css/filterbyproduct.css'
import ProductItem from '../../components/ProductItem';
import Pagination from '@mui/material/Pagination';




const FilterByProduct = ({ data, total, page, setPage, filterList, searchNum, setSearchNum }) => {


    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <div className='filterbyproduct'>
            <div className='filter-product_list'>
                <Divider orientation="left">Danh mục sản phẩm</Divider>
                <List className='product-list'
                    size="large"
                    // header={<div>Tất cả sản phẩm</div>}
                    // footer={<div>Túi tote</div>}
                    bordered
                    dataSource={filterList}
                    renderItem={(item, index) => <List.Item style={{ cursor: "pointer", color: filterList[(Number(searchNum))] == item ? "red" : "" }} onClick={() => setSearchNum(index)}>{item}</List.Item>}
                />
            </div>
            <div className='filter-product_detail'>
                {data.map((item, index) => {
                    return <div key={index}>
                        <ProductItem data={item} noLike />
                    </div>
                })}

            </div>
            <div className="filter-product_page">
            </div>
            <div className='filter-product_page_number'>  <Pagination count={total} color="secondary" defaultPage={page} onChange={handleChange} />
            </div>
        </div>
    )
}

export default FilterByProduct