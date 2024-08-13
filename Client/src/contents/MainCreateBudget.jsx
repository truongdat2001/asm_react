import { useContext } from "react";
import Budget from "./CreateBudget/Budget";
// import GuideCreateBudget from "./CreateBudget/Guide";
import { TabUiMainContent } from "../hooks/useContext/MainTabContext";

const MainCreateBudget = () => {
    const { tabContentCreateBudget } = useContext(TabUiMainContent)
    return (
        <div>
            {/* {tabContentCreateBudget === 1 && <GuideCreateBudget />} */}
            {tabContentCreateBudget === 1 && <Budget />}
        </div>
    );
};

export default MainCreateBudget;