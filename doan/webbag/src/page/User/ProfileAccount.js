import React, { useState, useContext, useEffect } from 'react'
import { Input } from 'antd';
import '../../assets/css/user.css'
import AuthServices from "../../services/authServices"
import { AuthContext } from '../../context/AuthContext';
import Toast from "../../components/Toast"


const ProfileAccount = () => {
    const { auth } = useContext(AuthContext)
    const [changePass, setChangePass] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
    })
    const hanldeChangePassword = async () => {
        try {
            const { newPasswordConfirm, ...rest } = changePass
            if (changePass.newPassword !== changePass.newPasswordConfirm) {
                Toast("error", "Mật khẩu mới không trùng khớp")
                return
            }
            await AuthServices.changePassword(auth.id, rest)
            Toast("success", "Đổi mật khẩu thành công")
        }
        catch (error) {
            Toast("error", "Mật khẩu cũ không đúng")
        }

    }



    return (
        <>
            <div className='user-information_update'>

                <div className='user-update_title'>
                    <h3>Đổi Mật Khẩu</h3>
                    <h4>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</h4>
                </div>
                <div className='user-update_information'>
                    <div className='user-update_item'>

                        <div className='update-title_name'>
                            <div className='title-name_user'>
                                <label>Tên đăng nhập</label>
                            </div>
                            <div className='update-name_user'>
                                <label>x7trung</label>
                            </div>

                        </div>
                        <div className='update-title_name'>
                            <div className='title-name_user'>

                                <label>Mật khẩu hiện tại</label>
                            </div>
                            <div className='update-name_user'>

                                <Input placeholder="Nhập mật khẩu" value={changePass.oldPassword} onChange={(e) => setChangePass({ ...changePass, oldPassword: e.target.value })} />
                            </div>
                        </div>
                        <div className='update-title_name'>
                            <div className='title-name_user'>
                                <label>Mật khẩu mới</label>

                            </div>
                            <div className='update-name_user'>
                                <Input placeholder="Nhập mật khẩu mới" value={changePass.newPassword} onChange={(e) => setChangePass({ ...changePass, newPassword: e.target.value })} />
                            </div>

                        </div>
                        <div className='update-title_name'>
                            <div className='title-name_user'>

                                <label>Xác nhận mật khẩu</label>
                            </div>
                            <div className='update-name_user'>

                                <Input placeholder="Nhập lại mật khẩu mới" value={changePass.newPasswordConfirm} onChange={(e) => setChangePass({ ...changePass, newPasswordConfirm: e.target.value })} />
                            </div>
                        </div>

                        <div className='update-title_name'>
                            <div className='title-name_user'>


                                <button onClick={hanldeChangePassword}>Xác nhận</button>
                            </div>



                        </div>


                    </div>

                </div>
            </div>

        </>
    )
}

export default ProfileAccount