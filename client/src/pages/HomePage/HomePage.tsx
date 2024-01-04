import styles from "./HomePage.module.scss";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Homepage = (props: any) => {
    /*     const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/category")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []); */

    /*    console.log(categories); */

    console.log("da", props.data);

    return (
        <div className={styles.container}>
            <h1>Kategorije</h1>
            <div className={styles.container}>
                {props.data.map((category: any) => (
                    <div key={category._id}>
                        <CategoryCard name={category.name} id={category._id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
