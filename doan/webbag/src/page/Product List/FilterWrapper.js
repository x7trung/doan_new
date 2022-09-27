import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterByColor from './FilterByColor';
import FilterByPrice from './FilterByPrice';
import FilterBySize from './FilterBySize';
import FilterBySort from './FilterBySort';
import { MdSettingsBackupRestore } from 'react-icons/md';
import ProductServices from '../../services/productServices'
import { Select, Radio } from 'antd';

const { Option } = Select;
export default function FilterWrapper({ setSelectPrice, setSelectSize, setSortBy, setMaterial, setSelectColor, expand, setExpand, setGender, setStraptype }) {
    const [price, setPrice] = React.useState([1000, 10000])
    const [size, setSize] = React.useState(["Nhỏ", "Trung bình", "Lớn", ""])
    const [activeSize, setActiveSize] = React.useState(-1)
    const [sorting, setSorting] = React.useState("")
    const [colors, setColors] = React.useState([])
    const [activeColors, setActiveColors] = React.useState(-1)
    const [mateList, setMateList] = React.useState([''])
    const [straptypeList, setStraptypeList] = React.useState([''])
    const [mate, setMate] = React.useState("")
    const [genderList, setGenderList] = React.useState(["", "Nam", 'Nữ'])
    const [genders, setGenders] = React.useState("")
    const [straptypes, setStraptypes] = React.useState("")
    const [loading, setLoading] = React.useState(false)





    const handleSelect = () => {
        setSelectPrice(price);
        setSelectSize(size[activeSize])
        setSortBy(sorting)
        setMaterial(mate)
        setSelectColor(colors[activeColors])
        setGender(genders)
        // setStraptype(straptypes)
        console.log(sorting)

    }
    const handleReset = () => {
        setPrice([1000, 10000]);
        setSelectPrice([1000, 10000]);
        setSelectSize("")
        setActiveSize(3)
        setSortBy("")
        setSorting("")
        setSelectColor("")
        setActiveColors(-1)
        setMaterial("")
        setGender("")
        // setStraptype("")
    }
    React.useEffect(() => {
        const getData = async () => {
            setLoading(true)

            try {
                const productsParams = {
                    limit: 500000, page: 1,

                }
                const data = await ProductServices.getProducts(productsParams)

                setColors([...new Set(data.data.map(item => {
                    return {
                        colors: item.detail.map(i => i.color.toLowerCase())
                    }
                }).map(i => i.colors).flat(Infinity))])
                setMateList(
                    ["", ...new Set(data.data.map(item => {
                        return item.material
                    }))]
                )
                // setStraptypeList(
                //     ["", ...new Set(data.data.map(item => {
                //         return item.strap_type
                //     }))]
                // )
            } catch (error) {
                console.log(error.message)
            } setLoading(false)

        }
        getData()
    }, [])

    const handleChange = (value) => {
        setSorting(value);
    };
    return (
        <div>
            <Accordion expanded={expand}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={() => setExpand(!expand)}
                >
                    <Typography>Bộ lọc sản phẩm</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>

                        <div className='filter-wrapper filter-wrapper_ones'>
                            <FilterByColor colors={colors} setActiveColors={setActiveColors} activeColors={activeColors} />
                            <FilterBySize setActiveSize={setActiveSize} activeSize={activeSize} />
                            <FilterByPrice price={price} setPrice={setPrice} />
                            <FilterBySort setSorting={setSorting} sorting={sorting} />
                        </div>
                        <div className='filter-wrapper filter-wrapper_twos'>
                            <div className='filter-wrapper_material'>
                                <h3>Chọn chất liệu</h3>
                                <Select className="header-search_filter"
                                    defaultValue={mateList[0]}
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={(value) => setMate(value)}
                                >
                                    {mateList.map((item, index) => {
                                        if (index === 0) return <Option value={''} key={index}>Tất cả</Option>
                                        return <Option value={item} key={index}>{item}</Option>
                                    })}

                                </Select>
                            </div>
                            <div className='filter-wrapper_material'>
                                <h3>Giới tính</h3>
                                <Radio.Group
                                    defaultValue=""
                                    onChange={(e) => setGenders(e.target.value)}
                                >
                                    {genderList.map((item, index) => {
                                        if (index === 0) return <Radio value={""} key={index} >Tất cả</Radio>
                                        return <Radio value={item} key={index} >{item}</Radio>
                                    })}


                                </Radio.Group>
                            </div>
                            {/* <div className='filter-wrapper_material'>
                                <h3>Chọn kiểu dây</h3>
                                <Select className="header-search_filter"
                                    defaultValue={straptypeList[0]}
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={(value) => setStraptypes(value)}
                                >
                                    {straptypeList.map((item, index) => {
                                        if (index === 0) return <Option value={''} key={index}>Tất cả</Option>
                                        return <Option value={item} key={index}>{item}</Option>
                                    })}

                                </Select>
                            </div> */}
                            <div className='filter-sort_btn'>
                                <button className='btn-filter' onClick={handleSelect}>Lọc</button><br />
                                <button className='btn-icon' onClick={handleReset}><MdSettingsBackupRestore /></button>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>

        </div >
    );
}
