import { useEffect, useState } from "react";
import subCategoriesService from "../services/subCategories/subCategoriesService";
import React from "react";
import { formatCurrency } from "../config/formatCurrency";
import moment from "moment"


// eslint-disable-next-line react/display-name
const ManagerSpendingUser = React.memo((props) => {
    const { idUserCheck } = props;
    const [dataSpending, setDataSpending] = useState([]);

    const getDetailSubCategories = async () => {
        const dataSubDetailCategories = await subCategoriesService.getSubCategoriesById(idUserCheck);
        setDataSpending(dataSubDetailCategories);
    };

    useEffect(() => {
        if (idUserCheck) {
            getDetailSubCategories();
        }
    }, [idUserCheck]);

    console.log(dataSpending);


    return (
        <>
            <div className="w-full mx-auto my-4 p-4 bg-white rounded-lg shadow-md">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Ngân sách</th>
                            <th className="px-4 py-2">Nhóm chi tiêu</th>
                            <th className="px-4 py-2">Số tiền đã tiêu</th>
                            <th className="px-4 py-2">Thời gian</th>
                            {/* <th className="px-4 py-2">Hành động</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {dataSpending.map((spending) => (
                            <tr key={spending._id}>
                                <td className="border px-4 py-2 text-center">
                                    {spending?.budget ? formatCurrency(spending.budget.budget) : "Không có ngân sách"}
                                </td>
                                <td className="border px-4 py-2 text-center">{spending.name}</td>
                                <td className="border px-4 py-2 text-center">
                                    {spending?.spending?.length > 0 ? (
                                        <div>
                                            <span>{formatCurrency(
                                                spending.spending.reduce(
                                                    (total, current) => total + current.moneySpending, 0
                                                )
                                            )}</span>
                                        </div>
                                    ) : (
                                        <span>Chưa thêm</span>
                                    )}
                                </td>

                                <td className="border px-4 py-2 text-center">{moment(spending.createdAt).format("HH:mm DD/MM/YYYY")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
});

export default ManagerSpendingUser;
