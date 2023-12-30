import styles from "./HomePage.module.scss";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

const Homepage = () => {
  return (
    <div>
      <h1>Kategorije</h1>
      <div className={styles.container}>
        <CategoryCard name="Skincare" />
        <CategoryCard name="Parfemi" />
        <CategoryCard name="Skincare" />
        <CategoryCard name="Skincare" />
        <CategoryCard name="Skincare" />
        <CategoryCard name="Skincare" />
        <CategoryCard name="Skincare" />
      </div>
    </div>
  );
};

export default Homepage;
