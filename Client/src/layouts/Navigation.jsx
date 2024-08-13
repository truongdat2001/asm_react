import { useContext } from "react";
import { AuthUserContext } from "../hooks/useContext/AuthContext";
import { Link } from 'react-router-dom';
import { MdLogout } from "react-icons/md";

const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
}

const Navigation = ({ setIsLoginOpen, setIsRegisterOpen }) => {
    const { user, token } = useContext(AuthUserContext);

    return (
        <div className="p-3 border-b-2 flex justify-end items-center">
            <div className="flex items-center gap-2">
                {token ? (
                    <>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center">
                                    <img
                                        className="w-[40px] rounded-full"
                                        src="https://png.pngtree.com/png-vector/20190805/ourlarge/pngtree-account-avatar-user-abstract-circle-background-flat-color-icon-png-image_1650938.jpg"
                                        alt="User Avatar"
                                    />

                                    {user?.username && (
                                        <span className="font-semibold">{user.username}</span>
                                    )}
                                </div>

                                {user.admin === true &&
                                    <div>
                                        <Link className="flex items-center p-1 bg-slate-300 gap-2 cursor-pointer hover:bg-slate-200 duration-300 rounded-[5px]" to={'/admin'}>Quản lý người dùng</Link>
                                    </div>}
                            </div>

                            {token && token !== undefined &&
                                <div className="flex items-center p-1 bg-slate-300 gap-2 cursor-pointer hover:bg-slate-200 duration-300 rounded-[5px]">
                                    <MdLogout />
                                    <span onClick={() => handleLogout()}>Đăng Xuất</span>
                                </div>}
                        </div>
                    </>
                ) : (
                    <div className="flex gap-2 items-center">
                        <button
                            className="p-1 rounded-[5px] w-[100px]"
                            style={{ border: "2px solid #01adf1" }}
                            onClick={setIsLoginOpen}
                        >
                            Đăng Nhập
                        </button>
                        <button
                            className="p-1 rounded-[5px] w-[100px]"
                            style={{ border: "2px solid #01adf1" }}
                            onClick={setIsRegisterOpen}
                        >
                            Đăng Ký
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navigation;
