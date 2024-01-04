import { NavLink } from "react-router-dom";
import styles from "./SubCategoryCard.module.scss";

const SubCategoryCard = (props: any) => {
    console.log(props.categoryId, props.subcategoryId);

    return (
        <NavLink
            to={`/${props.categoryId}/${props.subcategoryId}`}
            style={{ textDecoration: "none" }}
        >
            <div className={styles.container}>
                <h1>{props.name}</h1>
            </div>
        </NavLink>
    );
};

export default SubCategoryCard;
