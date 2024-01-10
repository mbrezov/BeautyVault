import { NavLink } from "react-router-dom";
import styles from "./ProductCard.module.scss";

const ProductCard = (props: any) => {
    return (
        <NavLink
            to={`/${props.categoryId}/${props.subcategoryId}/${props.productId}`}
            style={{ textDecoration: "none" }}
        >
            <div className={styles.container}>
                <h1>{props.title}</h1>
                {props.buy === true ? <div>Kupi</div> : <div>Nemoj kupiti</div>}
                <div>{props.rating}</div>
            </div>
        </NavLink>
    );
};

export default ProductCard;
