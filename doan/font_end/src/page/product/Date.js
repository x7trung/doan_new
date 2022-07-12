import { DatePicker, Select, Space, TimePicker } from 'antd';
import React, { useState } from 'react';
import '../../assets/date.css'
const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {
    // if (type === 'time') return <TimePicker onChange={onChange} />;
    if (type === 'date') return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
};


const Date = () => {
    const [type, setType] = useState('date');
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
                        <Option value="date">Ngày</Option>
                        <Option value="month">Tháng</Option>
                    </Select>
                    <PickerWithType type={type} onChange={(value) => console.log(value)} />
                </Space>
            </div>
        </div>
    )
}

export default Date