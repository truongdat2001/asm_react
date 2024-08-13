import { useContext } from "react";
import Chart from "./Analysis/Chart";
import { AuthUserContext } from "../hooks/useContext/AuthContext";
import slideImage from "../assets/images/slide.png"

const AnalysisBudget = () => {
    const { user } = useContext(AuthUserContext)
    return (
        <>
            {user.length === 0 ? (
                <>
                <img className="rounded-[10px]" src={slideImage} alt="" />
            </>
            ) : (
                <>
                    <Chart />
                </>)}
        </>
    );
};

export default AnalysisBudget;