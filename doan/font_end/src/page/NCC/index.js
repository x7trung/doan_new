import { Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import Supplier from '../../services/supplierServices'
import TableNCC from '../NCC/TableNCC'
import Add from './Add'
import '../../assets/NCC.css'

const { Option } = Select;

const NCC = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [nameNCC, setNameNCC] = useState('')

    const getData = async () => {

        setLoading(true)
        try {
            let dataParams
            dataParams = {
                "name[regex]": nameNCC,
            }
            const suplier = await Supplier.getSupplier(dataParams)
            setData(suplier.data)


        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [nameNCC])
    if (loading) return <div>Loading ...</div>
    return (
        <div>
            <div className='containerNCC-title'>
                <div className='NCC-filter'>
                    <Select
                        defaultValue={nameNCC}
                        style={{
                            width: 120,
                        }}
                        onChange={(value) => setNameNCC(value)}
                    >
                        <Option value="">tất cả</Option>
                        <Option value="micocah">micocah</Option>
                        <Option value="juststart">juststar</Option>
                        <Option value="narci">narci</Option>
                    </Select>
                </div>
                <div className='product-add_data'>
                    <button onClick={() => setVisible(true)}>Thêm sản phẩm</button>
                    <Modal
                        title="Thêm Sản phẩm"
                        centered
                        visible={visible}
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        width={1800}
                        footer={null}
                        maskClosable={false}
                    >
                        <Add />
                    </Modal>
                </div>
            </div>
            <TableNCC data={data} setData={setData} />
        </div>
    )
}

export default NCC