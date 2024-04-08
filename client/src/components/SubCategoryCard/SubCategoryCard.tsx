import { NavLink } from "react-router-dom";
import styles from "./SubcategoryCard.module.scss";
import { useEffect, useState } from "react";

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
    const [updatedSubcategory, setUpdatedSubcategory] = useState("");

    useEffect(() => {
        if (editing) {
            setUpdatedSubcategory(name);
        }
    }, [editing, name]);

    return (
        <>
            <div className={styles.container}>
                {editing ? (
                    <textarea
                        className={styles.edit_subcategory_name}
                        value={updatedSubcategory as string}
                        maxLength={50}
                        rows={
                            updatedSubcategory.length > 40
                                ? 3
                                : updatedSubcategory.length > 20
                                ? 2
                                : 1
                        }
                        onChange={(e) => setUpdatedSubcategory(e.target.value)}
                    />
                ) : (
                    <NavLink
                        to={URL}
                        style={{
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <h1>{name}</h1>
                    </NavLink>
                )}
            </div>
        </>
    );
};
