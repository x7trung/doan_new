import React, { useState } from 'react';
import { Slider } from 'antd';
import '../../assets/css/filterbyprice.css'

const FilterByPrice = ({ price, setPrice }) => {

    const onChange = (value) => {
        setPrice(value)
    };
    return (
        <div className="filterby filterby_item">
            <h3>Giá tiền</h3>
            <div className='filterby-price'>

                <Slider range defaultValue={price} min={1000} max={10000} onChange={onChange} tooltipVisible={false} />
                <div className='filter-price'>
                    <h4>Giá tiền:<span>{price[0]},000đ</span> - <span>{price[1]},000đ</span></h4>
                </div>
            </div>
        </div>
    )
}

export default FilterByPrice