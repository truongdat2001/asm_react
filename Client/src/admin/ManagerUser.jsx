import { useEffect, useState } from "react";
import AuthService from "../services/auth/authService";
import { useNavigate } from "react-router-dom";
import { showToastSuccess } from "../config/toastConfig";
import ManagerSpendingUser from "./ManagerSpendingUser";

const ManagerUser = () => {
    const [users, setUsers] = useState([])

    const [showSpendingUser, setShowSpendingUser] = useState(false)
    
    const [idUserCheck, setIdUserCheck] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getAllUser()
    },[])

    const getAllUser = async () => {
        const user = await AuthService.getAllUser();
        setUsers(user)
    }

    const handleDeleteUser = async (id) => {
        const user = await AuthService.deleteUser(id);
        showToastSuccess(user.message)
        getAllUser()
    }

    const handleCheckUser = (id) => {
        setIdUserCheck(id)
        setShowSpendingUser(true)
    }


    return (
        < >
            <div>
                <div className="p-3 shadow bg-[#fff] m-2 h-dvh rounded-[10px]">
                    <div className="flex justify-between">
                        <span className="text-[30px] font-bold">Quản Lý Người Dùng</span>
                        <button onClick={() => navigate('/')} className="text-[20px] font-bold bg-blue-500 text-[#fff] p-2 rounded-[5px]">Trở lại</button>
                    </div>
                    <div className="overflow-y-auto h-[740px] scrollbar-thin">
                        <table className="w-full"  >
                            <thead className="bg-gray-100 h-16">
                                <tr>
                                    <th className="text-left px-4">ID</th>
                                    <th className="text-left px-4">Email</th>
                                    <th className="text-left px-4">Tên</th>
                                    <th className="text-left px-4">Chức vụ</th>
                                    <th className="pr-5 py-2 " colSpan="10">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {users && users.map((user) => (
                                    <tr className="border-b border-gray-200" key={user._id}>
                                        <td className="text-left px-4 py-2">{user._id}</td>
                                        <td className="text-left px-4 py-2">
                                            {user.email}
                                        </td>
                                        <td className="text-left px-4 py-2">{user.username}</td>
                                        <td className="text-left px-4 py-2">
                                            {user.admin === true ? "admin" : "Người dùng"}
                                        </td>
                                        <td className="px-1 py-2">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => handleCheckUser(user._id)} className="bg-green-600 text-[#fff] p-2 rounded-[5px]" >Kiểm Tra </button>
                                                <button className="text-[#fff] bg-red-600 p-2 rounded-[5px]" onClick={() => handleDeleteUser(user._id)} >Xóa </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {showSpendingUser &&
                            (<ManagerSpendingUser  idUserCheck={idUserCheck}/>)
                        }
                    </div>
                </div>
            </div>
        </>

    );
};

export default ManagerUser;