// import axios from "axios";
// import { useProductsContext } from "../../hooks/useProductsContext";
import { NavLink } from "react-router-dom";
import { IProduct } from "../../interfaces/interface";
import styles from "./ProductCard.module.scss";
import { ThreeCircles } from "react-loader-spinner";

interface IProps {
    product: IProduct;
    categoryId?: string;
    subcategoryId?: string;
}

export const ProductCard = ({ product, categoryId, subcategoryId }: IProps) => {
    const URL = `/${categoryId}/${subcategoryId}/${product._id}`;
    // const { dispatch } = useProductsContext();

    // const api = process.env.REACT_APP_PRODUCT;

    // const deleteProduct = async () => {
    //     if (api && categoryId && subcategoryId && product._id) {
    //         try {
    //             await axios.delete(
    //                 api
    //                     .replace("categoryId", categoryId)
    //                     .replace("subcategoryId", subcategoryId)
    //                     .replace("productId", product._id)
    //             );
    //             dispatch({
    //                 type: "DELETE_PRODUCT",
    //                 payload: product._id,
    //             });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         console.error(
    //             "REACT_APP_PRODUCT environment variable is not defined."
    //         );
    //     }
    // };

    return (
        <>
            <NavLink to={URL} style={{ textDecoration: "none" }}>
                <div className={styles.container}>
                    {product.imgUrl ? (
                        <img alt="error" src={product.imgUrl} />
                    ) : (
                        <ThreeCircles
                            visible={true}
                            height="70"
                            width="70"
                            color="#b0bbb0"
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{ padding: "15px" }}
                            wrapperClass=""
                        />
                    )}
                    <h1>{product.title}</h1>
                    <div className={styles.info}>
                        <div className={styles.rating}>{product.rating}</div>
                    </div>
                </div>
            </NavLink>
        </>
    );
};
