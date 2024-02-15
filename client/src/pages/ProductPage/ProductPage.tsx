import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BackButton } from "../../components/BackButton/BackButton";
// import { IProduct } from "../../interfaces/interface";
import styles from "./ProductPage.module.scss";
import { useProductsContext } from "../../hooks/useProductsContext";

const ProductPage = () => {
    const { product, dispatch } = useProductsContext();
    const { categoryId, subcategoryId, productId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    //const [productData, setProductData] = useState<IProduct>();

    const api = process.env.REACT_APP_PRODUCT;

    useEffect(() => {
        setIsLoading(true);
        if (api && categoryId && subcategoryId && productId) {
            axios
                .get(
                    api
                        .replace("categoryId", categoryId)
                        .replace("subcategoryId", subcategoryId)
                        .replace("productId", productId)
                )
                .then((res) => {
                    // setProductData(res.data);
                    dispatch({ type: "SET_PRODUCT", payload: res.data });
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching product data", error);
                });
        } else {
            console.error(
                "REACT_APP_PRODUCT environment variable is not defined."
            );
        }
    }, [api, categoryId, subcategoryId, productId, dispatch]);

    return (
        <>
            {!isLoading ? (
                <div className={styles.container}>
                    <div>
                        <BackButton />
                    </div>
                    <div>
                        <h1>{product?.title}</h1>
                        <div> {product?.description}</div>
                        <div>{product?.rating}</div>
                        {product?.buy === true ? (
                            <div>Kupi</div>
                        ) : (
                            <div>nemoj kupiti</div>
                        )}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ProductPage;
