import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubcategoryCard } from "../../components/SubcategoryCard/SubcategoryCard";
import { BackButton } from "../../components/BackButton/BackButton";
import { ISubcategory, IStatus } from "../../interfaces/interface";
import { useSubcategoryContext } from "../../hooks/useSubcategoryContext";
import { Hearts } from "react-loader-spinner";
import styles from "./SubcategoryPage.module.scss";
import {
    CheckIcon,
    PencilSquareIcon,
    SquaresPlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { useAuthContext } from "../../hooks/useAuthContext";
import CSS from "csstype";

const SubcategoryPage = () => {
    const { categoryId } = useParams<string>();
    const { subcategories, dispatch } = useSubcategoryContext();
    const [newSubcategory, setNewSubcategory] = useState<String>("");
    const [status, setStatus] = useState<IStatus>({
        isLoading: true,
        isEditing: false,
        isDialogOpen: false,
    });
    const [newNameSubcategory, setNewNameSubcategry] = useState({
        newName: "",
        id: "",
    });

    const { user } = useAuthContext();
    const api = process.env.REACT_APP_SUBCATEGORIES;

    //style that checks if a dialog is opened and applies if it is
    const dialogStatusStyle = (isDialogOpen: boolean): CSS.Properties => {
        return isDialogOpen
            ? {
                  filter: "blur(5px)",
                  pointerEvents: "none",
              }
            : {};
    };

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        if (api && categoryId) {
            user &&
                axios
                    .get(api.replace("categoryId", categoryId), {
                        headers: { Authorization: `Bearer ${user.token}` },
                        cancelToken: cancelToken.token,
                    })
                    .then((res) => {
                        dispatch({
                            type: "SET_SUBCATEGORIES",
                            payload: res.data,
                        });
                        setStatus((prevStatus) => ({
                            ...prevStatus,
                            isLoading: false,
                        }));
                    })
                    .catch((error: any) => {
                        if (axios.isCancel(error)) {
                            console.log("Canceled");
                        } else {
                            console.log(api.replace(":categoryId", categoryId));
                            console.error("Error fetching categories:", error);
                        }
                    });
        } else {
            console.error(
                "REACT_APP_SUBCATEGORIES environment variable is not defined."
            );
        }
        return () => {
            cancelToken.cancel();
        };
    }, [categoryId, dispatch, api, user]);

    const addNewSubcategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSubcategory) {
            alert("Please enter subcategory title.");
        }
        try {
            if (api && categoryId && newSubcategory) {
                const response = await axios.post(
                    api.replace("categoryId", categoryId),
                    { name: newSubcategory },
                    {
                        headers: { Authorization: `Bearer ${user.token}` },
                    }
                );
                console.log(response.data, "napravljena");
                dispatch({
                    type: "CREATE_SUBCATEGORY",
                    payload: response.data,
                });
                setStatus((prevStatus) => ({
                    ...prevStatus,
                    isDialogOpen: false,
                }));
                setNewSubcategory("");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const deleteSubcategory = async (subcategoryId: string) => {
        try {
            await axios.delete(`${api}/${subcategoryId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            //console.log(`Deleted subcategory with ID ${subcategoryId}`);
            dispatch({
                type: "DELETE_SUBCATEGORY",
                payload: subcategoryId,
            });
            //checks if its 1 because react state is late by one event **TODO - fix so the state is updated in the real-time**
            subcategories.length === 1 &&
                setStatus((prevStatus) => ({
                    ...prevStatus,
                    isEditing: false,
                }));
        } catch (error) {
            console.error(error);
        }
    };

    const updateSubcategory = async (e: React.FormEvent) => {
        setStatus((prevStatus) => ({ ...prevStatus, isLoading: true }));
        try {
            const response = await axios.patch(
                `http://localhost:4000/api/category/${categoryId}/subcategory/${newNameSubcategory.id}`,
                { name: newNameSubcategory.newName },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            dispatch({
                type: "UPDATE_SUBCATEGORY",
                payload: response.data,
            });
            setStatus((prevStatus) => ({
                ...prevStatus,
                isLoading: false,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const enableEditing = (e: React.FormEvent) => {
        status.isEditing === false
            ? setStatus((prevStatus) => ({ ...prevStatus, isEditing: true }))
            : setStatus((prevStatus) => ({ ...prevStatus, isEditing: false }));
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.header}
                style={dialogStatusStyle(status.isDialogOpen)}
            >
                <div className={styles.back_button}>
                    <BackButton />
                </div>
                <div className={styles.action_buttons}>
                    {subcategories && subcategories.length > 0 && (
                        <>
                            {status.isEditing ? (
                                <button
                                    className={styles.edit_button}
                                    onClick={(e) => {
                                        enableEditing(e);
                                        newNameSubcategory.newName.length > 0 &&
                                            updateSubcategory(e);
                                    }}
                                >
                                    <CheckIcon
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            color: "black",
                                        }}
                                    />
                                </button>
                            ) : (
                                <button
                                    className={styles.edit_button}
                                    onClick={(e) => {
                                        enableEditing(e);
                                    }}
                                >
                                    <PencilSquareIcon
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            color: "black",
                                        }}
                                    />
                                </button>
                            )}
                        </>
                    )}
                    <button
                        onClick={() =>
                            setStatus((prevStatus) => ({
                                ...prevStatus,
                                isDialogOpen: true,
                            }))
                        }
                    >
                        <SquaresPlusIcon
                            style={{
                                width: "30px",
                                height: "30px",
                                color: "black",
                            }}
                        />
                    </button>
                </div>
            </div>
            {status.isDialogOpen && (
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
                            <button
                                onClick={() => {
                                    setNewSubcategory("");
                                    setStatus((prevStatus) => ({
                                        ...prevStatus,
                                        isDialogOpen: false,
                                    }));
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </dialog>
            )}
            {status.isLoading ? (
                <Hearts
                    height="150"
                    width="150"
                    color="#839788"
                    ariaLabel="hearts-loading"
                    wrapperStyle={{ marginTop: "150px" }}
                    wrapperClass=""
                    visible={true}
                />
            ) : subcategories && subcategories.length > 0 ? (
                <>
                    {subcategories &&
                        subcategories.map((subcategory: ISubcategory) => (
                            <div
                                className={styles.card_container}
                                key={subcategory._id}
                                style={dialogStatusStyle(status.isDialogOpen)}
                            >
                                <SubcategoryCard
                                    name={subcategory.name}
                                    categoryId={categoryId}
                                    subcategoryId={subcategory._id}
                                    editing={status.isEditing}
                                    user={user}
                                    onNameChange={(newName) =>
                                        setNewNameSubcategry({
                                            newName: newName,
                                            id: subcategory._id,
                                        })
                                    }
                                />

                                {status.isEditing && (
                                    <button
                                        className={styles.delete_button}
                                        onClick={() =>
                                            deleteSubcategory(subcategory._id)
                                        }
                                    >
                                        <TrashIcon
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                color: "black",
                                            }}
                                        />
                                    </button>
                                )}
                            </div>
                        ))}
                </>
            ) : (
                <div
                    className={styles.no_content}
                    style={dialogStatusStyle(status.isDialogOpen)}
                >
                    To add a subcategory, please press the '+' button.
                </div>
            )}
        </div>
    );
};

export default SubcategoryPage;
