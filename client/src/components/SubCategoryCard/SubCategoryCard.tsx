import { NavLink } from "react-router-dom";
import styles from "./SubCategoryCard.module.scss";

const SubCategoryCard = (props: any) => {
    const category_url = props.category.toLowerCase();
    const subCategory_url = props.subCategory.toLowerCase();
    return (
        <NavLink
            to={`/${category_url}/${subCategory_url}`}
            style={{ textDecoration: "none" }}
        >
            <div className={styles.container}>
                <h1>{props.subCategory}</h1>
            </div>
        </NavLink>
    );
};

export default SubCategoryCard;
