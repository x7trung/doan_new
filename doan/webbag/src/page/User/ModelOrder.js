import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import InformationOrder from './InformationOrder';
const ModelOrder = ({ data }) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className='profileorder-order_modal'>
            <Button type="primary" onClick={() => setVisible(true)}>
                Thông tin đơn hàng
            </Button>
            <Modal
                title="Thông tin đơn hàng"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
                footer={null}
            >
                <InformationOrder data={data} />
            </Modal>
        </div>
    )
}

export default ModelOrder