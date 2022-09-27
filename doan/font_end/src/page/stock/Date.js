import { DatePicker, Select, Space, TimePicker } from 'antd';
import React, { useState } from 'react';
import '../../assets/date.css'
import moment from 'moment'


const { Option } = Select;

const Date = ({ setMonth, month }) => {

    const onChangeMonth = (data) => {
        setMonth({
            month: moment(data).format("M"),
            year: moment(data).format("Y"),
        });
    };

    return (
        <div className='date-product'>
            <div className='date-filter'>
                <Space>
                    <DatePicker picker={"month"} onChange={onChangeMonth}
                        defaultValue={moment(`${month.year}/${month.month}/1`)} />
                </Space>
            </div>
        </div>
    )
}

export default Date