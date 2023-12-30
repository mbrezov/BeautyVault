import { NavLink } from "react-router-dom";
import styles from "./ProductCard.module.scss";

//ici ce link na productID

const ProductCard = (props: any) => {
  return (
    <NavLink
      to={`/${props.productCategory}/${props.productName}`}
      style={{ textDecoration: "none" }}
    >
      <div className={styles.container}>
        <h1>{props.productName}</h1>
      </div>
    </NavLink>
  );
};

export default ProductCard;
