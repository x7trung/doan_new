import React, { useState } from 'react'

import '../../assets/overview.css'
import { Link } from 'react-router-dom';
const Overview = ({ dataview }) => {

    return (
        <div className='category-map'>
            {
                dataview.map((item, index) => {
                    return <div className='category-card' key={index}>
                        <Link to={item.link}>
                            <div className='category-card_title'>
                                <h3>  {item.title}</h3>
                            </div>
                            <div className='category-card_wrapper'>
                                <div className='category-card_income'>
                                    <div className='incom_number'>
                                        <h2>{item.money}</h2>
                                    </div>
                                    <div className='incom_view'>
                                        <h3>{item.view}</h3>
                                    </div>
                                </div>
                                <div className='category-card_icon'>
                                    {item.icon}
                                </div>
                            </div>
                        </Link>
                    </div>
                })
            }
        </div>
    )
}

export default Overview