import { DatePicker, Select, Space, TimePicker } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {
    // if (type === 'time') return <TimePicker onChange={onChange} />;
    if (type === 'date') return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
};


const DateOrder = () => {
    const [type, setType] = useState('date');
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className='date-order'>
            <div className='goods-filter'>
                <Select
                    defaultValue="lucy"
                    style={{
                        width: 150,

                    }}
                    onChange={handleChange}
                >
                    <Option value="jack">Tất cả </Option>
                    <Option value="lucy">Chờ xác nhận</Option>
                    <Option value="disabled">
                        Đang giao
                    </Option>
                    <Option value="disabled">
                        Giao thành công
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

export default DateOrder