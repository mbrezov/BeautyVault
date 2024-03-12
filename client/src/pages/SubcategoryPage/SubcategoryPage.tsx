import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubcategoryCard } from "../../components/SubcategoryCard/SubcategoryCard";
import { BackButton } from "../../components/BackButton/BackButton";
import { ISubcategory } from "../../interfaces/interface";
import { Add, Delete, Edit } from "../../utility/icons";
import { useSubcategoryContext } from "../../hooks/useSubcategoryContext";
import styles from "./SubcategoryPage.module.scss";

const SubcategoryPage = () => {
    const { subcategories, dispatch } = useSubcategoryContext();
    const [newSubcategory, setnewSubcategory] = useState("");
    const [isDialogOpen, setDialogOpen] = useState(false);
    const { categoryId } = useParams<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const api = process.env.REACT_APP_SUBCATEGORIES;

    useEffect(() => {
        const api = process.env.REACT_APP_SUBCATEGORIES;
        setIsLoading(true);

        if (api && categoryId) {
            axios
                .get(api.replace("categoryId", categoryId))
                .then((res) => {
                    dispatch({ type: "SET_SUBCATEGORIES", payload: res.data });
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(api.replace(":categoryId", categoryId));
                    console.error("Error fetching categories:", error);
                });
        } else {
            console.error(
                "REACT_APP_SUBCATEGORIES environment variable is not defined."
            );
        }
    }, [categoryId, dispatch]);

    const addNewSubcategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (api && categoryId) {
                const response = await axios.post(
                    api.replace("categoryId", categoryId),
                    { name: newSubcategory }
                );
                console.log(response);
                dispatch({
                    type: "CREATE_SUBCATEGORY",
                    payload: response.data,
                });
                setDialogOpen(false);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const deleteSubcategory = async (subcategoryId: string) => {
        try {
            await axios.delete(`${api}/${subcategoryId}`);

            console.log(`Deleted subcategory with ID ${subcategoryId}`);
            dispatch({
                type: "DELETE_SUBCATEGORY",
                payload: subcategoryId,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const enableEditing = (e: any) => {
        isEditing === false ? setIsEditing(true) : setIsEditing(false);
    };

    console.log(isEditing);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.back_button}>
                    <BackButton />
                </div>
                <div className={styles.action_buttons}>
                    <button
                        className={styles.edit_button}
                        onClick={(e) => enableEditing(e)}
                    >
                        <Edit />
                    </button>
                    <button
                        className={styles.add_button}
                        onClick={() => setDialogOpen(true)}
                    >
                        <Add />
                    </button>
                </div>
            </div>
            {isDialogOpen && (
                <dialog open>
                    <form onSubmit={addNewSubcategory} className={styles.form}>
                        <input
                            type="text"
                            onChange={(e) => {
                                setnewSubcategory(e.target.value);
                            }}
                        />
                        <button type="submit">submit</button>
                        <button onClick={() => setDialogOpen(false)}>
                            Cancel
                        </button>
                    </form>
                </dialog>
            )}
            {!isLoading ? (
                <>
                    {subcategories &&
                        subcategories.map((subcategory: ISubcategory) => (
                            <div
                                className={styles.card_container}
                                key={subcategory._id}
                                style={
                                    isDialogOpen
                                        ? {
                                              filter: "blur(5px)",
                                              pointerEvents: "none",
                                          }
                                        : {}
                                }
                            >
                                <SubcategoryCard
                                    name={subcategory.name}
                                    categoryId={categoryId}
                                    subcategoryId={subcategory._id}
                                />

                                {isEditing && (
                                    <button
                                        className={styles.delete_button}
                                        onClick={() =>
                                            deleteSubcategory(subcategory._id)
                                        }
                                    >
                                        <Delete />
                                    </button>
                                )}
                            </div>
                        ))}
                </>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
};

export default SubcategoryPage;
