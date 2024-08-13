import ItemsTabList from "../components/ListItems/ListNavigation";
import { TabUiContext } from "../hooks/useContext/TabContext";
import { useContext } from "react";

const Sidebar = () => {
    const { handleShowContent, contentShow } = useContext(TabUiContext)

    return (
        <>
            <div className="flex flex-col justify-between min-h-[140vh] bg-[#F1F5F9] p-4 border-r-2">
                <div>
                    <div className=" border-b-2 flex justify-between items-center pb-3">
                        <div className="flex items-center gap-2">
                            <img className="w-[200px] rounded-full" src="https://sothuchi.misa.vn/sites/sothuchi/images/logo.png" alt="" />
                        </div>
                    </div>

                    <div>
                        {ItemsTabList.map((tabList) => (
                            <>
                                <div
                                    className={`flex items-center gap-3 my-2 cursor-pointer rounded-[5px]  p-2 duration-300 hover:shadow ${contentShow === tabList.indexTab
                                        ?
                                        'bg-[#01adf1] text-[#fff]'
                                        : null}`}
                                    key={tabList.id}
                                    onClick={() => handleShowContent(tabList.indexTab)}
                                >
                                    <span>{tabList.icon}</span>
                                    <span>{tabList.item}</span>
                                </div>
                            </>
                        ))}
                    </div>
                </div>


            </div>
        </>
    );
};

export default Sidebar;
