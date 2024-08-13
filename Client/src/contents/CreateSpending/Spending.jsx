import { CiSquarePlus } from "react-icons/ci";
import { useState, useEffect, useContext } from "react";
import moment from 'moment'
import CreateSpending from "./CreateSpending";
import spendingService from '../../services/spending/spendingService';
import { AuthUserContext } from '../../hooks/useContext/AuthContext';
import { showToastError, showToastSuccess } from "../../config/toastConfig";
import { formatCurrency } from "../../config/formatCurrency";
import UpdateSpending from "./UpdateSpending";
import subCategoriesService from "../../services/subCategories/subCategoriesService";
import iconImageLogo from '../../assets/images/icon-logo.jpg'

const Spending = () => {
    const [showFormSpending, setShowFormSpending] = useState(false);
    const [showFormUpdateSpending, setShowFormUpdateSpending] = useState(false);
    const [idSpending, setIdSpending] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const { user } = useContext(AuthUserContext);

    const getDataSpending = async () => {
        const result = await spendingService.getDataSpending(user?._id);
        setTransactions(result);

    };

    const getSubcate = async () => {
        const subCate = await subCategoriesService.getSubCategoriesById(user?._id);
        setSubCategories(subCate);

    };

    useEffect(() => {
        if (!user?._id) {
            return showToastError("Vui lòng đăng nhập để thực hiện tạo giao dịch")
        }
        getDataSpending();
        getSubcate();
    }, [user]);

    const handleDelete = async (id) => {
        if (!id) {
            return;
        }
        const result = await spendingService.deleteSpending(id);
        getDataSpending();
        showToastSuccess(result.message);

    };

    const handleEdit = (id) => {
        setIdSpending(id);
        setShowFormUpdateSpending(true);
    };

    return (
        <>
            {user ? (
                <>
                    {showFormSpending && (
                        <div className="absolute left-[35%] top-[0%] z-20">
                            <CreateSpending handleHideForm={setShowFormSpending} getDataSpending={getDataSpending} />
                        </div>
                    )}
                    {showFormUpdateSpending && (
                        <div className="absolute left-[35%] top-[0%] z-20">
                            <UpdateSpending handleHideForm={setShowFormUpdateSpending} idSpending={idSpending} subCategories={subCategories} getDataSpending={getDataSpending} />
                        </div>
                    )}

                    <h1 className="text-[30px]">Thêm giao dịch</h1>
                    <div className="flex justify-between gap-5 bg-[#01adf1] w-full rounded-[5px] p-5">
                        <div className="flex gap-2">
                            <div>
                                <span className="text-[20px] block font-bold text-[#fff]">Tạo chi tiêu</span>
                                <span className="text-[15px] text-[#fff]">Bạn sẽ được thông báo khi chi tiêu</span>
                            </div>
                            <div>
                                <img className="w-[100px]" style={{ borderRadius: "30px" }} src={iconImageLogo} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full mx-auto my-4 p-4 bg-white rounded-lg shadow-md">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Số tiền</th>
                                    <th className="px-4 py-2">Nguồn tiền</th>
                                    <th className="px-4 py-2">Thời gian</th>
                                    <th className="px-4 py-2">Nhóm chi tiêu</th>
                                    <th className="px-4 py-2">Ghi chú</th>
                                    <th className="px-4 py-2">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction._id}>
                                        <td className="border px-4 py-2 text-center">{formatCurrency(transaction.moneySpending)}</td>
                                        <td className="border px-4 py-2 text-center">Giao Dịch</td>
                                        <td className="border px-4 py-2 text-center">{moment(transaction.dateSpending).format("MM/DD/YYYY")}</td>
                                        <td className="border px-4 py-2 text-center">{transaction.subCategoryId?.name}</td>
                                        <td className="border px-4 py-2 text-center">{transaction.note}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <button className="bg-red-500 text-white px-2 py-2 rounded-md mr-2" onClick={() => handleDelete(transaction._id)}> Xoá</button>
                                            <button className="bg-blue-500 text-white px-2 py-2 rounded-md" onClick={() => handleEdit(transaction._id)}> Chỉnh sửa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div onClick={() => setShowFormSpending(true)} className="flex justify-center mt-4 items-center gap-2 cursor-pointer border-2 border-[#01adf1] p-2 rounded-[5px]">
                        <CiSquarePlus className="text-[25px] text-[#01adf1]" />
                        <span className="text-[#01adf1] font-semibold">Tạo Giao Dịch Chi Tiêu</span>
                    </div>
                </>
            ) : (
                <h1>Vui lòng đăng nhập để tiếp tục</h1>
            )}
        </>
    );
};

export default Spending;
