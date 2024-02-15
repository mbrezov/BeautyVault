import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubcategoryCard } from "../../components/SubcategoryCard/SubcategoryCard";
import { BackButton } from "../../components/BackButton/BackButton";
import { ISubcategory } from "../../interfaces/interface";
import styles from "./Subcategory.module.scss";
import { AddIcon } from "../../utility/icons";
import { useSubcategoryContext } from "../../hooks/useSubcategoryContext";

const SubcategoryPage = () => {
    const { subcategories, dispatch } = useSubcategoryContext();
    // const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
    const [newSubcategory, setnewSubcategory] = useState("");
    const [isDialogOpen, setDialogOpen] = useState(false);
    const { categoryId } = useParams<string>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const api = process.env.REACT_APP_SUBCATEGORIES;
        setIsLoading(true);

        if (api && categoryId) {
            axios
                .get(api.replace("categoryId", categoryId))
                .then((res) => {
                    // setSubcategories(res.data)
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
            const response = await axios.post(
                `http://localhost:4000/api/category/${categoryId}/subcategory`,
                { name: newSubcategory }
            );
            console.log(response);
            dispatch({ type: "CREATE_SUBCATEGORY", payload: response.data });
            setDialogOpen(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.back_button}>
                    <BackButton />
                </div>
                <button
                    className={styles.add_button}
                    onClick={() => setDialogOpen(true)}
                >
                    <AddIcon />
                </button>
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
                            </div>
                        ))}
                </>
            ) : null}
        </div>
    );
};

export default SubcategoryPage;
