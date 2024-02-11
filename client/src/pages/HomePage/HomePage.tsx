import styles from "./HomePage.module.scss";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { ICategory } from "../../interfaces/interface";

interface IProps {
    categories: ICategory[];
}

const Homepage = ({ categories }: IProps) => {
    return (
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
    );
};

export default Homepage;
