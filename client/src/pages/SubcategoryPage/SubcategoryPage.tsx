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
    const [newSubcategory, setNewSubcategory] = useState("");
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
        if (!newSubcategory) {
            alert("Please enter subcategory title.");
        }
        try {
            if (api && categoryId && newSubcategory) {
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
                setNewSubcategory("");
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

    const enableEditing = (e: React.FormEvent) => {
        isEditing === false ? setIsEditing(true) : setIsEditing(false);
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.header}
                style={
                    isDialogOpen
                        ? {
                              filter: "blur(5px)",
                              pointerEvents: "none",
                          }
                        : {}
                }
            >
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
                        <p>Enter subcategory title</p>
                        <input
                            type="text"
                            maxLength={50}
                            placeholder="Title"
                            onChange={(e) => {
                                setNewSubcategory(e.target.value);
                            }}
                        />
                        <div className={styles.max_length}>
                            Max length of the title is 50 characters
                        </div>
                        <div className={styles.buttons}>
                            <button type="submit">Submit</button>
                            <button onClick={() => setDialogOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </dialog>
            )}
            {isLoading ? (
                <div>Loading ...</div>
            ) : subcategories && subcategories.length > 0 ? (
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
                                    editing={isEditing}
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
                <div
                    className={styles.no_content}
                    style={
                        isDialogOpen
                            ? {
                                  filter: "blur(5px)",
                                  pointerEvents: "none",
                              }
                            : {}
                    }
                >
                    To add a subcategory, please press the '+' button.
                </div>
            )}
        </div>
    );
};

export default SubcategoryPage;
