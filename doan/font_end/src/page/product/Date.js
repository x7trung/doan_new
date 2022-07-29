import { DatePicker, Select, Space, TimePicker } from 'antd';
import React, { useState } from 'react';
import '../../assets/date.css'
import moment from 'moment'


const { Option } = Select;

const Date = ({ setMonth, month }) => {

    const [type, setType] = useState('month');
    const onChangeMonth = (data) => {
        setMonth({
            month: moment(data).format("M"),
            year: moment(data).format("Y"),
        });
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className='date-product'>
            <div className='goods-filter'>
                <Select
                    defaultValue="lucy"
                    style={{
                        width: 150,

                    }}
                    onChange={handleChange}
                >
                    <Option value="jack">Tất cả </Option>
                    <Option value="lucy">Còn hàng trong kho</Option>
                    <Option value="disabled">
                        Hết hàng trong kho
                    </Option>
                </Select>
            </div>
            <div className='date-filter'>
                <Space>
                    <Select value={type} onChange={setType}>
                        <Option value="month">Tháng</Option>
                    </Select>
                    <DatePicker picker={"month"} onChange={onChangeMonth}
                        defaultValue={moment(`${month.year}/${month.month}/1`)} />


                </Space>
            </div>
        </div>
    )
}

export default Date