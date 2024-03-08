import { NavLink } from "react-router-dom";
import styles from "./SubcategoryCard.module.scss";
import axios from "axios";
import { useSubcategoryContext } from "../../hooks/useSubcategoryContext";

interface IProps {
    name: string;
    categoryId: string | undefined;
    subcategoryId: string;
}

export const SubcategoryCard = (props: IProps) => {
    const URL = `/${props.categoryId}/${props.subcategoryId}`;
    const { dispatch } = useSubcategoryContext();
    const api = process.env.REACT_APP_SUBCATEGORIES;

    //delete subcategory
    const handleClick = async () => {
        try {
            await axios.delete(`${api}/${props.subcategoryId}`);

            console.log(`Deleted subcategory with ID ${props.subcategoryId}`);
            dispatch({
                type: "DELETE_SUBCATEGORY",
                payload: props.subcategoryId,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <NavLink to={URL} style={{ textDecoration: "none" }}>
                <div className={styles.container}>
                    <h1>{props.name}</h1>
                </div>
            </NavLink>
            <button onClick={handleClick}>Delete</button>
        </>
    );
};
