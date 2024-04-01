import axios from "axios";
import { useEffect, useState } from "react";
import { ICategory } from "../../interfaces/interface";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";
import styles from "./HomePage.module.scss";
import HomePageSkeleton from "../../components/Skeletons/HomePageSkeleton";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLogout } from "../../hooks/useLogout";

const Homepage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const { logout } = useLogout();
    const api = process.env.REACT_APP_CATEGORIES;

    useEffect(() => {
        if (api) {
            axios
                .get(api)
                .then((res) => {
                    setCategories(res.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching categories:", error);
                });
        } else {
            console.error(
                "REACT_APP_CATEGORIES environment variable is not defined."
            );
        }
    }, [api]);

    return (
        <>
            {isDialogOpen && (
                <dialog
                    open
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <button onClick={(e) => setDialogOpen(false)}>
                        <XMarkIcon style={{ width: "24px", height: "24px" }} />
                    </button>
                    <button onClick={() => logout()}>Logout</button>
                </dialog>
            )}
            {isLoading ? (
                <HomePageSkeleton />
            ) : (
                <div
                    style={
                        isDialogOpen
                            ? {
                                  filter: "blur(5px)",
                                  pointerEvents: "none",
                              }
                            : {}
                    }
                >
                    <div className={styles.header}>
                        <h1>Kategorije</h1>
                        <button onClick={(e) => setDialogOpen(true)}>
                            <UserCircleIcon
                                style={{ width: "40px", height: "40px" }}
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
