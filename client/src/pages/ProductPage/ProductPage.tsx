import axios from "axios";
import { useEffect, useState } from "react";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../../components/BackButton/BackButton";
import { Like, Dislike, Edit, Done } from "../../utility/icons";
import styles from "./ProductPage.module.scss";
import ProductPageSkeleton from "../../components/Skeletons/ProductPageSkeleton";
import { IProduct } from "../../interfaces/interface";
import {
    CheckIcon,
    CloudArrowUpIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

const ProductPage = () => {
    const { product, dispatch } = useProductsContext();
    const { categoryId, subcategoryId, productId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [updatedProduct, setUpdatedProduct] = useState<IProduct>({
        title: "",
        description: "",
        rating: 0,
        buy: false,
        _id: "",
        img: "",
        imgUrl: "",
    });

    const api = process.env.REACT_APP_PRODUCT;

    useEffect(() => {
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

    const enableEditing = (e: React.FormEvent) => {
        if (!isEditing) {
            setIsEditing(true);
            setUpdatedProduct(product);
        } else {
            setIsEditing(false);
        }
    };

    const deleteProduct = async () => {
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

    const updateProduct = () => {
        alert("Im working :)");
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.back_button}>
                    <BackButton />
                </div>
                <button
                    className={styles.edit_button}
                    onClick={(e) => enableEditing(e)}
                >
                    {isEditing ? (
                        <CheckIcon
                            style={{
                                width: "30px",
                                height: "30px",
                            }}
                        />
                    ) : (
                        <PencilSquareIcon
                            style={{ width: "30px", height: "30px" }}
                        />
                    )}
                </button>
            </div>
            {isLoading ? (
                <ProductPageSkeleton />
            ) : (
                <>
                    {isEditing ? (
                        <>
                            <button
                                className={styles.delete_button}
                                onClick={deleteProduct}
                            >
                                <TrashIcon
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </button>
                            <button
                                className={styles.delete_button}
                                onClick={updateProduct}
                            >
                                <CloudArrowUpIcon
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </button>
                            <div className={styles.product_card}>
                                <img
                                    width="340"
                                    height="340"
                                    alt="palcehodler"
                                    src={product?.imgUrl}
                                />
                                <textarea
                                    className={styles.edit_title}
                                    rows={4}
                                    value={updatedProduct?.title}
                                    onChange={(e) =>
                                        setUpdatedProduct({
                                            ...updatedProduct,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    className={styles.edit_description}
                                    rows={15}
                                    value={updatedProduct?.description}
                                    onChange={(e) =>
                                        setUpdatedProduct({
                                            ...updatedProduct,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <div className={styles.edit_rating}>
                                    <input
                                        type="number"
                                        placeholder={product?.rating}
                                        min={1}
                                        max={5}
                                    />
                                    |
                                    {product?.buy === true ? (
                                        <Like />
                                    ) : (
                                        <Dislike />
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.product_card}>
                            <img
                                width="340"
                                height="340"
                                alt="palcehodler"
                                src={product?.imgUrl}
                            />
                            <h2 className={styles.title}>{product?.title}</h2>
                            <div className={styles.description}>
                                {product?.description}
                            </div>
                            <div className={styles.rating}>
                                {product?.rating} |
                                {product?.buy === true ? <Like /> : <Dislike />}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductPage;
