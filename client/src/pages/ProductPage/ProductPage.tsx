import axios from "axios";
import { useEffect, useState } from "react";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../../components/BackButton/BackButton";
import styles from "./ProductPage.module.scss";
import ProductPageSkeleton from "../../components/Skeletons/ProductPageSkeleton";
import { IProduct } from "../../interfaces/interface";
import {
    CheckIcon,
    CloudArrowUpIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { Textarea, NumberInput } from "@mantine/core";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProductPage = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { product, dispatch } = useProductsContext();
    const { categoryId, subcategoryId, productId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
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
            user &&
                axios
                    .get(
                        api
                            .replace("categoryId", categoryId)
                            .replace("subcategoryId", subcategoryId)
                            .replace("productId", productId),
                        {
                            headers: { Authorization: `Bearer ${user.token}` },
                        }
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
    }, [api, categoryId, subcategoryId, productId, dispatch, user]);

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
                        .replace("productId", productId),
                    { headers: { Authorization: `Bearer ${user.token}` } }
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
                                color: "black",
                            }}
                        />
                    ) : (
                        <PencilSquareIcon
                            style={{
                                width: "30px",
                                height: "30px",
                                color: "black",
                            }}
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
                            <div className={styles.edit_action_buttons}>
                                <button
                                    className={styles.delete_button}
                                    onClick={deleteProduct}
                                >
                                    <TrashIcon
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                            color: "black",
                                        }}
                                    />
                                </button>
                                <button
                                    className={styles.delete_button}
                                    onClick={updateProduct}
                                >
                                    <CloudArrowUpIcon
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                            color: "black",
                                        }}
                                    />
                                </button>
                            </div>
                            <div className={styles.product_card}>
                                <img
                                    width="340"
                                    height="340"
                                    alt="palcehodler"
                                    src={product?.imgUrl}
                                />
                                <Textarea
                                    classNames={{
                                        root: styles.edit_title_root,
                                        input: styles.edit_title_input,
                                    }}
                                    maxLength={100}
                                    autosize
                                    minRows={1}
                                    value={updatedProduct?.title}
                                    onChange={(e) =>
                                        setUpdatedProduct({
                                            ...updatedProduct,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <Textarea
                                    classNames={{
                                        root: styles.edit_description_root,
                                        input: styles.edit_description_input,
                                    }}
                                    autosize
                                    minRows={1}
                                    maxLength={700}
                                    value={updatedProduct?.description}
                                    onChange={(e) =>
                                        setUpdatedProduct({
                                            ...updatedProduct,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <div className={styles.edit_rating}>
                                    <NumberInput
                                        classNames={{
                                            input: styles.edit_rating_input,
                                            controls:
                                                styles.edit_rating_controls,
                                        }}
                                        placeholder={product.rating}
                                        rightSectionPointerEvents="none"
                                        clampBehavior="strict"
                                        min={1}
                                        max={5}
                                    />
                                    |
                                    {product?.buy === true ? (
                                        <HandThumbUpIcon
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                            }}
                                        />
                                    ) : (
                                        <HandThumbDownIcon
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                            }}
                                        />
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
                                {product?.buy === true ? (
                                    <HandThumbUpIcon
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                        }}
                                    />
                                ) : (
                                    <HandThumbDownIcon
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductPage;
