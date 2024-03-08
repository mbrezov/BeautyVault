import { NavLink } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import { IProduct } from "../../interfaces/interface";
import { useProductsContext } from "../../hooks/useProductsContext";
import axios from "axios";

interface IProps {
    product: IProduct;
    categoryId?: string;
    subcategoryId?: string;
}

export const ProductCard = ({ product, categoryId, subcategoryId }: IProps) => {
    const URL = `/${categoryId}/${subcategoryId}/${product._id}`;
    const { dispatch } = useProductsContext();

    const api = process.env.REACT_APP_PRODUCT;

    const deleteProduct = async () => {
        if (api && categoryId && subcategoryId && product._id) {
            try {
                await axios.delete(
                    api
                        .replace("categoryId", categoryId)
                        .replace("subcategoryId", subcategoryId)
                        .replace("productId", product._id)
                );
                dispatch({
                    type: "DELETE_PRODUCT",
                    payload: product._id,
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            console.error(
                "REACT_APP_PRODUCT environment variable is not defined."
            );
        }
    };

    return (
        <>
            <NavLink to={URL} style={{ textDecoration: "none" }}>
                <div className={styles.container}>
                    <h1>{product.title}</h1>

                    {product.buy === true ? (
                        <div>Kupi</div>
                    ) : (
                        <div>Nemoj kupiti</div>
                    )}
                    <div>{product.rating}</div>
                    <img
                        width="64"
                        height="64"
                        alt="palcehodler"
                        src={product.imgUrl}
                    />
                </div>
            </NavLink>
            <button onClick={deleteProduct}>DELEETE</button>
        </>
    );
};
