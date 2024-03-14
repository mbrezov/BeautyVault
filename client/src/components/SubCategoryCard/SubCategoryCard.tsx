import { NavLink } from "react-router-dom";
import styles from "./SubcategoryCard.module.scss";

interface IProps {
    name: string;
    categoryId: string | undefined;
    subcategoryId: string;
    editing: true | false;
}

export const SubcategoryCard = ({
    name,
    categoryId,
    subcategoryId,
    editing,
}: IProps) => {
    const URL = `/${categoryId}/${subcategoryId}`;

    return (
        <>
            <div className={styles.container}>
                {editing ? (
                    <input type="text" placeholder={name} maxLength={50} />
                ) : (
                    <NavLink to={URL} style={{ textDecoration: "none" }}>
                        <h1>{name}</h1>
                    </NavLink>
                )}
            </div>
        </>
    );
};
