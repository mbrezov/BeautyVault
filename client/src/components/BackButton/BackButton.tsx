import { useNavigate } from "react-router-dom";
import { Back } from "../../utility/icons";
import styles from "./BackButton.module.scss";

export const BackButton = () => {
    let back = useNavigate();
    return (
        <div>
            <button className={styles.container} onClick={() => back(-1)}>
                <Back />
            </button>
        </div>
    );
};
