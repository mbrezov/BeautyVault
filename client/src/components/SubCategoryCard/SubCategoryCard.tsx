import { NavLink } from "react-router-dom";
import styles from "./SubcategoryCard.module.scss";

interface IProps {
    name: string;
    categoryId: string | undefined;
    subcategoryId: string;
}

export const SubcategoryCard = (props: IProps) => {
    const URL = `/${props.categoryId}/${props.subcategoryId}`;

    return (
        <NavLink to={URL} style={{ textDecoration: "none" }}>
            <div className={styles.container}>
                <h1>{props.name}</h1>
            </div>
        </NavLink>
    );
};
