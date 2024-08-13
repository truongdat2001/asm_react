import { useEffect, useState } from "react";
import subCategoriesService from "../../services/subCategories/subCategoriesService";
import iconImageLogo from '../../assets/images/icon-logo.jpg'

const EditCategories = (props) => {
  const { handleHideForm , getCategories , IdSubCategories } = props;
  const [editNameCategory, setEditNameCategory] = useState("");
  
useEffect(()=>{
    const getData = async ()=>{
        const datas = await subCategoriesService.getDetailSubCategoriesById(IdSubCategories);
        setEditNameCategory(datas?.name || "");
    }
    getData()
},[])

  const handleEditCategory = async () => {
    const data = {
      name: editNameCategory,
    };

    if (!data.name) {
      return;
    }

    try {
      await subCategoriesService.editSubCategories(IdSubCategories,data);
      getCategories()
      handleHideForm(false);
      setEditNameCategory("");
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };

  return (
    <>
    <div className="fixed inset-0 cursor-pointer bg-black bg-opacity-50 z-50" onClick={() => handleHideForm(false)}></div>
      <div className="z-50 fixed top-[30px] left-[30vw] bg-[rgb(228,228,228)] p-5 pt-0 rounded-[5px]">
        <div className="py-3 flex items-center">
          <img
            className="w-[100px] rounded-3xl"
            src={iconImageLogo}
            alt=""
          />
          <span className="text-[20px] pl-1">Chỉnh Sửa Danh Mục</span>
        </div>
        <div className="bg-[#fff] shadow w-[500px] p-3 rounded-[5px]">
          <div>
            <label>Tên Danh Mục</label>
            <input
            value={editNameCategory}
              onChange={(e) => setEditNameCategory(e.target.value)}
              type="text"
              placeholder="Sửa Tên Danh Mục"
              className="block my-2 w-full p-2 rounded-[5px] border-2 border-slate-300 relative"
            />
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={handleEditCategory}
              className={`${
                editNameCategory 
                  ? "bg-[#01adf1] text-[#fff]"
                  : "bg-slate-200"
              } w-full rounded-[5px] p-2 text-[#b4b4b4] duration-300`}
            >
              Sửa
            </button>
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={() => handleHideForm(false)}
              className="bg-red-500 w-full rounded-[5px] p-2 text-[#fff]"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategories;
