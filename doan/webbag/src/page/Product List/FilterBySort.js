import React from 'react'
import { Select } from 'antd';
import '../../assets/css/filterbysort.css'
const { Option } = Select;

const FilterBySort = ({ setSorting, sorting }) => {
    const handleChange = (value) => {
        setSorting(value);
    };
    return (
        <div className="filterby">
            <h3>Sắp xếp theo</h3>
            <div className='filter-sort'>
                <div className='filter-sort_select'>

                    <Select className="header-search_filter"
                        defaultValue={sorting}
                        style={{
                            width: 200,
                        }}
                        onChange={handleChange}
                    >
                        <Option value="">Tất cả</Option>
                        <Option value="like">Yêu thích nhất</Option>
                        <Option value="created">Mới nhất</Option>
                        <Option value="price">Giá tăng dần</Option>
                        <Option value="-price" >
                            Giá giảm dần
                        </Option>
                        <Option value="-discount">giảm nhiều nhất</Option>
                        
                    </Select>
                </div>


            </div>

        </div>
    )
}

export default FilterBySort