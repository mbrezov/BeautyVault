import styles from "./HomePage.module.scss";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

const Homepage = (props: any) => {
    return (
        <div>
            <h1>Kategorije</h1>
            <div className={styles.container}>
                {props.category.map((category: any) => (
                    <div key={category._id}>
                        <CategoryCard name={category.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
