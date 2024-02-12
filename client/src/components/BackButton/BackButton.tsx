import { useNavigate } from "react-router-dom";
import { BackIcon } from "../../utility/icons";
import styles from "./BackButton.module.scss";

export const BackButton = () => {
    let back = useNavigate();
    return (
        <div>
            <button className={styles.container} onClick={() => back(-1)}>
                <BackIcon />
            </button>
        </div>
    );
};
