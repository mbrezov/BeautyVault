import { NavLink } from "react-router-dom";
import styles from "./SubcategoryCard.module.scss";
import { useEffect, useState } from "react";

interface IProps {
    name: string;
    categoryId: string | undefined;
    subcategoryId: string;
    editing?: boolean;
    user: any;
    onNameChange: (newName: string) => void; // callback prop
}

export const SubcategoryCard = ({
    name,
    categoryId,
    subcategoryId,
    editing,
    onNameChange,
}: IProps) => {
    const URL = `/${categoryId}/${subcategoryId}`;
    const [updatedName, setUpdatedName] = useState("");

    useEffect(() => {
        if (editing) {
            setUpdatedName(name);
        }
    }, [editing, name]);

    const handleNameChange = (newName: string) => {
        setUpdatedName(newName);
        onNameChange(newName);
    };

    return (
        <>
            <div className={styles.container}>
                {editing ? (
                    <textarea
                        className={styles.edit_subcategory_name}
                        value={updatedName as string}
                        maxLength={50}
                        rows={
                            updatedName.length > 40
                                ? 3
                                : updatedName.length > 20
                                ? 2
                                : 1
                        }
                        onChange={(e) => handleNameChange(e.target.value)}
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
