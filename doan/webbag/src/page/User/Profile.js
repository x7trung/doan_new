import React, { useContext, useState, useEffect } from 'react'
import { Radio, DatePicker, Space, Input } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { AuthContext } from "../../context/AuthContext"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import UserServives from "../../services/userServices"
import Toast from "../../components/Toast"
import moment from 'moment';


const InputMui = styled('input')({
    display: 'none',
});
const Profile = () => {
    const [value, setValue] = useState(1);
    const [loading, setLoading] = useState(false)
    const { auth } = useContext(AuthContext)
    const [user, setUser] = useState({})
    const dateFormat = "DD/MM/YYYY";


    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                if (auth.id) {
                    const { data } = await UserServives.getUser(auth.id)
                    const { name, email, phone, sex, birth } = data
                    setUser({ name, email, phone, sex, birth: birth ? moment(birth).zone("+07:00").format(dateFormat).toString() : moment(new Date()).zone("+07:00").format(dateFormat).toString() })
                }

            } catch (error) {
                Toast("error", error.message)
            }
            setLoading(false)
        }
        getData()
    }, [])
    const onChange = (date, dateString) => {
        setUser({ ...user, birth: moment(date).zone("+07:00").format(dateFormat).toString() })

    };
    const handleUpdateUser = async () => {
        try {
            await UserServives.updateUser(auth.id, { ...user, birth: moment(user.birth).zone("+07:00").format(dateFormat).toString() })
            Toast("success", "Update user thành công")
        } catch (error) {
            Toast("error", error.message)
        }
    }




    if (loading) return <div>Loading...</div>
    return (
        <>
            <div className='user-information_update'>

                <div className='user-update_title'>
                    <h3>Hồ Sơ Của Tôi</h3>
                    <h4>Quản lý thông tin hồ sơ để bảo mật tài khoản</h4>
                </div>
                <div className='user-update_information'>
                    <div className='user-update_item'>

                        <div className='update-title_name'>
                            <div className='title-name_user'>
                                <label>Tên đăng nhập</label>
                            </div>
                            <div className='update-name_user'>
                                <label>{user.name}</label>
                            </div>

                        </div>
                        <div className='update-title_name'>
                            <div className='title-name_user'>

                                <label>Tên</label>
                            </div>
                            <div className='update-name_user'>

                                <Input placeholder="Nhập tên" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                            </div>
                        </div>
                        <div className='update-title_name'>
                            <div className='title-name_user'>
                                <label>Email</label>

                            </div>
                            <div className='update-name_user'>
                                <Input placeholder="Nhập Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </div>

                        </div>
                        <div className='update-title_name'>
                            <div className='title-name_user'>

                                <label>Số điện thoại</label>
                            </div>
                            <div className='update-name_user'>

                                <Input placeholder="Nhập số điện thoại" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                            </div>
                        </div>
                        <div className='update-title_name'>
                            <div className='title-name_user'>
                                <label>Giới tính</label>

                            </div>
                            <div className='update-name_user'>

                                <Radio.Group value={user.sex} onChange={(e) => setUser({ ...user, sex: e.target.value })}>
                                    <Radio value="nam">Nam</Radio>
                                    <Radio value="nữ">Nữ</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className='update-title_name'>
                            <div className='title-name_user'>
                                <label>Ngày sinh</label>

                            </div>
                            <div className='update-name_user'>


                                <DatePicker format={dateFormat} onChange={onChange} placeholder="Chọn ngày sinh" value={moment(user.birth, dateFormat)} />


                            </div>
                        </div>
                        <div className='update-title_name'>
                            <div className='title-name_user'>


                                <button onClick={handleUpdateUser}>Lưu</button>
                            </div>



                        </div>


                    </div>
                    <div className='user-update_img'>
                        <div className='user-img_icon'>
                            <AiOutlineUser />
                        </div>

                        <label htmlFor="contained-button-file">
                            <InputMui accept="image/*" id="contained-button-file" type="file" />
                            <Button variant="contained" component="span" className='user-img_btn'>
                                Chọn ảnh
                            </Button>
                        </label>
                        <div className='user-img_title'>

                            <h3>Dụng lượng file tối đa 1 MB</h3>
                            <h3>Định dạng:.JPEG, .PNG</h3>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile