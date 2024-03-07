import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import styles from "./ProductPage.module.scss";
import { useProductsContext } from "../../hooks/useProductsContext";

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
        <>
            {!isLoading ? (
                <div className={styles.container}>
                    <div>
                        <BackButton />
                    </div>
                    <div>
                        <button onClick={handleClick}>DELEETE</button>
                        <h1>{product?.title}</h1>
                        <div> {product?.description}</div>
                        <div>{product?.rating}</div>
                        {product?.buy === true ? (
                            <div>Kupi</div>
                        ) : (
                            <div>nemoj kupiti</div>
                        )}
                    </div>
                    <img
                        width="128"
                        height="128"
                        alt="palcehodler"
                        src={product?.imgUrl}
                    />
                </div>
            ) : null}
        </>
    );
};

export default ProductPage;
