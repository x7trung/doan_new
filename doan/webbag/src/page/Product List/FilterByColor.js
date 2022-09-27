import React, { useState, useEffect } from 'react'
import '../../assets/css/filterbycolor.css'


const FilterByColor = ({ colors,activeColors,setActiveColors }) => {

    


    
 
    return (
        <div className="filterby">
            <h3>Màu sắc</h3>
            <div className='filter-color'>
                {
                    colors.map((item, index) => {
                        return <div className={`detail-colorfull ${index === activeColors ? "active" : ""}`} style={{ backgroundColor: item }} key={index} onClick={() => setActiveColors(index)}></div>
                    })
                }

                <div className='filter-color_exit by' onClick={()=>setActiveColors(-1)}>X</div>
            </div>
        </div>
    )
}

export default FilterByColor