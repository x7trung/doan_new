import React, { useState } from 'react'
import { DatePicker, Radio } from 'antd';
import { RiMoneyDollarCircleFill, RiProductHuntLine } from 'react-icons/ri';
import { FaRegUserCircle } from 'react-icons/fa';
import '../../assets/money.css'



const { RangePicker } = DatePicker;
const Monney = () => {
    const [placement, SetPlacement] = useState('topLeft');

    const placementChange = (e) => {
        SetPlacement(e.target.value);
    };
    const [data, setData] = useState([
        {
            title: "Tổng thu nhập",
            name: "Doanh thu",
            icon: <RiMoneyDollarCircleFill />,
            money: "2000000đ"
        },
        {
            title: "Sản phẩm bán",
            name: "Tổng số",
            icon: <RiProductHuntLine style={{ color: "#5d698d" }} />,
            money: "200"
        },
        {
            title: "Khách mua",
            name: "Số lượng",
            icon: <FaRegUserCircle style={{ color: "#f7b84b" }} />,
            money: "200"
        },
    ])


    return (
        <div className='money'>
            <div className='time-money'>
                <Radio.Group value={placement} onChange={placementChange}>
                    <Radio.Button value="topLeft">Theo ngày</Radio.Button>
                    <Radio.Button value="topRight">theo tuần</Radio.Button>
                    <Radio.Button value="bottomLeft">theo tháng</Radio.Button>
                </Radio.Group>
                <br />
                <br />
                <DatePicker placement={placement} />
            </div>
            <div className='income-money'>
                {data.map((item, index) => {
                    return <div className='income-money_item' key={index}>
                        <div className='income-money_title'>
                            <h2>{item.title}</h2>
                        </div>
                        <h3>{item.name}</h3>
                        <div className='money_item'>

                            <div className='money-icon'>
                                {item.icon}
                            </div>
                            <div className='money-sale'>
                                <h2>{item.money}</h2>
                            </div>
                        </div>
                    </div>
                })}


            </div>

        </div>
    )
}

export default Monney