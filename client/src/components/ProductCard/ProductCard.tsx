import { NavLink } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import { IProduct } from "../../interfaces/interface";

interface IProps {
    product: IProduct;
    categoryId?: string;
    subcategoryId?: string;
}

export const ProductCard = ({ product, categoryId, subcategoryId }: IProps) => {
    const URL = `/${categoryId}/${subcategoryId}/${product._id}`;

    return (
        <NavLink to={URL} style={{ textDecoration: "none" }}>
            <div className={styles.container}>
                <h1>{product.title}</h1>
                {product.buy === true ? (
                    <div>Kupi</div>
                ) : (
                    <div>Nemoj kupiti</div>
                )}
                <div>{product.rating}</div>
            </div>
        </NavLink>
    );
};
