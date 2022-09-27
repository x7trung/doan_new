import React from 'react'
import '../../assets/css/filterbysize.css'
const FilterBySize = ({ setActiveSize, activeSize }) => {

    return (
        <div className="filterby">
            <h3>Kích cỡ</h3>
            <div className='filter-size'>
                <div className={`filter-size_container ${activeSize == 0 && "active"}`} onClick={() => setActiveSize(0)}>NHỎ</div>
                <div className={`filter-size_container ${activeSize == 1 && "active"}`} onClick={() => setActiveSize(1)}>TRUNG BÌNH</div>
                <div className={`filter-size_container ${activeSize == 2 && "active"}`} onClick={() => setActiveSize(2)}>LỚN</div>
                <div className='filter-color_exit by' onClick={() => setActiveSize(3)}>X</div>
            </div>
        </div>
    )
}

export default FilterBySize