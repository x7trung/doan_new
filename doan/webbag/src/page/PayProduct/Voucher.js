import { Modal, Tag } from 'antd';
import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md'
const Voucher = ({ selectVoucher, setSelectVoucher, totalCart }) => {
    const [visible, setVisible] = useState(false);
    const [voucher, setVoucher] = useState([
        {
            namevoucher: "5%",
            pricevoucher: 10000000,
            selectFuc: () => {
                setVisible(false)
                setSelectVoucher(5)
            },
            cancleFuc: () => {
                setVisible(false)
                setSelectVoucher(0)
            }, value: 5

        },
        {
            namevoucher: "10%",
            pricevoucher: 20000000,
            selectFuc: () => {
                setVisible(false)
                setSelectVoucher(10)
            },
            cancleFuc: () => {
                setVisible(false)
                setSelectVoucher(0)
            }, value: 10
        },
        {
            namevoucher: "15%",
            pricevoucher: 30000000,
            selectFuc: () => {
                setVisible(false)
                setSelectVoucher(15)
            },
            cancleFuc: () => {
                setVisible(false)
                setSelectVoucher(0)
            }, value: 15
        },
        {
            namevoucher: "20%",
            pricevoucher: 40000000,
            selectFuc: () => {
                setVisible(false)
                setSelectVoucher(20)
            },
            cancleFuc: () => {
                setVisible(false)
                setSelectVoucher(0)
            }, value: 20
        },
    ]);

    const checkValid = (valueStart) => {
        return totalCart > valueStart
    }
    return (
        <div className='pay-vouchers'>
            <div className='pay-vouchers-event' onClick={() => setVisible(true)}>
                <h3 >{selectVoucher == 0 ? "Chọn Voucher" : <Tag color="green">giảm {selectVoucher}% giá trị đơn hàng</Tag>}</h3>
                <MdKeyboardArrowRight className='pay-vouchers-event_icon' />
            </div>

            <Modal
                title="Kho Voucher"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
                footer={null}
            >
                <div className='payvouchers'>

                    <div className='payvouchers-information'>
                        {voucher.map((item, index) => {
                            return <div className='payvouchers-item' key={index}>
                                <div className='payvouchers-item_sticker'>
                                    <h2>Giảm {item.namevoucher}</h2>
                                    <h3>CHO ĐƠN TỐI THIỂU</h3>
                                    <h3>{item.pricevoucher.toLocaleString()} đ</h3>
                                </div>
                                <div className='payvouchers-item_information'>
                                    <div className='payvouchers-item_information_title'>
                                        <h2>Giảm {item.namevoucher}</h2>
                                        <h3>CHO ĐƠN TỐI THIỂU</h3>
                                        <h3>{item.pricevoucher.toLocaleString()} đ</h3>
                                    </div>
                                    <div className='payvouchers-item_information_pay'>
                                        <h3>Thanh toán</h3>
                                        <h3><span>tất cả thanh toán</span></h3>
                                        {selectVoucher == item.value ? <button className='btn-payvouchers' onClick={item.cancleFuc}>huỷ</button> : <button className='btn-payvouchers' onClick={item.selectFuc} disabled={!checkValid(item.pricevoucher)}>{!checkValid(item.pricevoucher) ? "chưa đủ điểu kiện" : "sử dụng"}</button>}

                                    </div>
                                </div>
                            </div>
                        })}

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Voucher