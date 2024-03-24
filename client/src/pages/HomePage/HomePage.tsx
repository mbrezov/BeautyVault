import axios from "axios";
import { useEffect, useState } from "react";
import { ICategory } from "../../interfaces/interface";
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";
import styles from "./HomePage.module.scss";
import HomePageSkeleton from "../../components/Skeletons/HomePageSkeleton";

const Homepage = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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
            {isLoading ? (
                <HomePageSkeleton />
            ) : (
                <div>
                    <h1>Kategorije</h1>
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
