import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import styles from "./ProductPage.module.scss";
import { useProductsContext } from "../../hooks/useProductsContext";
import { Like, Dislike } from "../../utility/icons";

const ProductPage = () => {
    const { product, dispatch } = useProductsContext();
    const { categoryId, subcategoryId, productId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
                    dispatch({ type: "GET_PRODUCT", payload: res.data });
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

    const handleClick = async () => {
        if (api && categoryId && subcategoryId && productId) {
            try {
                await axios.delete(
                    api
                        .replace("categoryId", categoryId)
                        .replace("subcategoryId", subcategoryId)
                        .replace("productId", productId)
                );
                navigate(-1);
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
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.back_button}>
                    <BackButton />
                </div>
            </div>
            {!isLoading ? (
                <div className={styles.product_card}>
                    <img
                        width="340"
                        height="340"
                        alt="palcehodler"
                        src={product?.imgUrl}
                    />
                    {/*        <button onClick={handleClick}>DELEETE</button>*/}
                    <h2 className={styles.title}>{product?.title}</h2>
                    <div className={styles.description}>
                        {product?.description}
                    </div>

                    <div className={styles.rating}>
                        {product?.rating} |
                        {product?.buy === true ? <Like /> : <Dislike />}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ProductPage;
