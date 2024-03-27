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
                    style={{ width: "24px", height: "24px", margin: "0" }}
                />
            </button>
        </div>
    );
};
