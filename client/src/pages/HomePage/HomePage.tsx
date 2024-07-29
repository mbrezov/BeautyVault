import axios from "axios";
import { useEffect, useState } from "react";
import { ICategory, IStatus } from "../../interfaces/interface";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";
import styles from "./HomePage.module.scss";
import HomePageSkeleton from "../../components/Skeletons/HomePageSkeleton";
import {
    ArrowRightStartOnRectangleIcon,
    EnvelopeIcon,
    UserCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Homepage = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [status, setStatus] = useState<IStatus>({
        isLoading: true,
        isDialogOpen: false,
        isLogoutDialogOpen: false,
    });

    const api = process.env.REACT_APP_CATEGORIES;

    useEffect(() => {
        if (api) {
            user &&
                axios
                    .get(api, {
                        headers: { Authorization: `Bearer ${user.token}` },
                    })
                    .then((res) => {
                        setCategories(res.data);
                        setStatus((prevStatus) => ({
                            ...prevStatus,
                            isLoading: false,
                        }));
                    })
                    .catch((error) => {
                        console.error("Error fetching categories:", error);
                    });
        } else {
            console.error(
                "REACT_APP_CATEGORIES environment variable is not defined."
            );
        }
    }, [api, user]);

    return (
        <>
            {status.isDialogOpen && !status.isLogoutDialogOpen && (
                <dialog open className={styles.account_dialog}>
                    <div className={styles.account_header}>
                        <p>Account</p>
                        <button
                            onClick={(e) =>
                                setStatus((prevStatus) => ({
                                    ...prevStatus,
                                    isDialogOpen: false,
                                }))
                            }
                            className={styles.cancel_button}
                        >
                            <XMarkIcon
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    color: "black",
                                }}
                            />
                        </button>
                    </div>
                    <UserCircleIcon
                        style={{
                            width: "64px",
                            height: "64px",
                            alignSelf: "center",
                            marginTop: "5px",
                            color: "black",
                        }}
                    />
                    <div className={styles.email}>
                        <EnvelopeIcon
                            style={{ width: "24px", height: "24px" }}
                        />
                        <p>{user.email}</p>
                    </div>
                    <button
                        onClick={() => {
                            setStatus((prevStatus) => ({
                                ...prevStatus,
                                isLogoutDialogOpen: true,
                            }));
                        }}
                        className={styles.logout_button}
                    >
                        <ArrowRightStartOnRectangleIcon
                            style={{
                                width: "24px",
                                height: "24px",
                                color: "black",
                            }}
                        />
                        <p>Logout</p>
                    </button>
                </dialog>
            )}
            {status.isLogoutDialogOpen && (
                <dialog open className={styles.logout_dialog}>
                    <p>Are you sure you want to logout?</p>
                    <div className={styles.buttons}>
                        <button
                            onClick={() => {
                                logout();
                                setStatus((prevStatus) => ({
                                    ...prevStatus,
                                    isLogoutDialogOpen: false,
                                    isDialogOpen: false,
                                }));
                            }}
                        >
                            <p>Yes</p>
                        </button>
                        <button
                            onClick={() => {
                                setStatus((prevStatus) => ({
                                    ...prevStatus,
                                    isLogoutDialogOpen: false,
                                }));
                            }}
                        >
                            <p>Cancel</p>
                        </button>
                    </div>
                </dialog>
            )}
            {status.isLoading ? (
                <HomePageSkeleton />
            ) : (
                <div
                    style={
                        status.isDialogOpen
                            ? {
                                  filter: "blur(5px)",
                                  pointerEvents: "none",
                              }
                            : {}
                    }
                >
                    <div className={styles.header}>
                        <h1>Kategorije</h1>
                        <button
                            onClick={(e) =>
                                setStatus((prevStatus) => ({
                                    ...prevStatus,
                                    isDialogOpen: true,
                                }))
                            }
                        >
                            <UserCircleIcon
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    color: "black",
                                }}
                            />
                        </button>
                    </div>
                    <div className={styles.container}>
                        {categories.map((category: ICategory) => (
                            <div key={category._id}>
                                <CategoryCard
                                    name={category.name}
                                    categoryId={category._id}
                                    cardColor={category.color}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Homepage;
