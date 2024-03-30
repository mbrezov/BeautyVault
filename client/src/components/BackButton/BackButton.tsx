import { useNavigate } from "react-router-dom";
// import { Back } from "../../utility/icons";
import styles from "./BackButton.module.scss";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export const BackButton = () => {
    let back = useNavigate();
    return (
        <div>
            <button className={styles.container} onClick={() => back(-1)}>
                <ArrowUturnLeftIcon
                    style={{ width: "30px", height: "30px", color: "black" }}
                />
            </button>
        </div>
    );
};
