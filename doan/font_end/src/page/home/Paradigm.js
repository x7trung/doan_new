
import '../../assets/paradigm.css'
import Chart from '../../components/Chart'
import { DatePicker, Select, Space, TimePicker } from 'antd';
import React, { useState } from 'react';



const { Option } = Select;


const translate = (type) => {
    switch (type) {
        case "week":
            return "tuần"
        case "month":
            return "tháng"
        case "year":
            return "năm"
        default:
            return "ngày"
    }
}


const Paradigm = ({ data, time, setTime, type, setType }) => {

    return (
        <div className='paradigm'>
            <div className='paradigm-title'>
                <div className='paradigm-pickertime'>
                    <Space>
                        <Select value={type} onChange={setType}>
                            <Option value="week">Tuần</Option>
                            <Option value="month">Tháng</Option>
                            <Option value="year">Năm</Option>
                        </Select>
                        <DatePicker picker={type} onChange={(_, dateString) => setTime(Number(dateString.match(/\d/g).slice(4).join("")))} />
                    </Space>
                </div>
                <h3>Thống kê doanh số cửa hàng theo {translate(type)} </h3>
                <div></div>
                <div></div>
            </div>
            <div className='paradigm-chart'>
                <Chart data={data} />
                <h3>Biểu đồ thu nhập cửa hàng trong năm</h3>
            </div>
            <div className='paradigm-infor'>
                <h3>Chú thích:</h3>
                <div className='paradigm-chart_infor'>
                    <div className='paradigm-chart_infor-color' style={{ backgroundColor: "violet" }}></div>
                    <div className='paradigm-chart_infor-label'>Lợi nhuận</div>
                </div>
                <div className='paradigm-chart_infor'>
                    <div className='paradigm-chart_infor-color' style={{ backgroundColor: "green" }}></div>
                    <div className='paradigm-chart_infor-label'>Tiền vốn</div>
                </div>
            </div>
        </div>
    )
}

export default Paradigm