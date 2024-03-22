import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useSubcategoryContext } from "../../hooks/useSubcategoryContext";
import {
    ISubcategory,
    IProduct,
    INewProduct,
} from "../../interfaces/interface";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { BackButton } from "../../components/BackButton/BackButton";
import { Add, Dislike, Like } from "../../utility/icons";
import styles from "./ProductsPage.module.scss";

const ProductsPage = () => {
    const { products, dispatch } = useProductsContext();
    const { subcategories } = useSubcategoryContext();
    const { categoryId, subcategoryId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fileName, setFileName] = useState("");
    const [newProduct, setNewProduct] = useState<INewProduct>({
        title: "",
        description: "",
        rating: 0,
        buy: false,
        img: "",
    });

    const api = process.env.REACT_APP_PRODUCTS;

    useEffect(() => {
        setIsLoading(true);
        if (api && categoryId && subcategoryId) {
            axios
                .get(
                    api
                        .replace("categoryId", categoryId)
                        .replace("subcategoryId", subcategoryId)
                )
                .then((res) => {
                    dispatch({ type: "GET_PRODUCTS", payload: res.data });
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching product data", error);
                });
        } else {
            console.error(
                "REACT_APP_PRODUCTS environment variable is not defined."
            );
        }
    }, [api, categoryId, subcategoryId, dispatch]);

    const addNewProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (api && categoryId && subcategoryId) {
            try {
                const formData = new FormData();
                formData.append("title", newProduct.title);
                formData.append("description", newProduct.description);
                formData.append("rating", String(newProduct.rating));
                formData.append("buy", String(newProduct.buy));
                formData.append("img", newProduct.img);

                const response = await axios.post(
                    api
                        .replace("categoryId", categoryId)
                        .replace("subcategoryId", subcategoryId),
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log("Product added:", response.data._id);
                dispatch({ type: "CREATE_PRODUCT", payload: response.data });
                setDialogOpen(false);
                setFileName("");
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.error(
                "REACT_APP_PRODUCTS environment variable is not defined."
            );
        }
    };

    //using session storage for getting subcategory title
    useEffect(() => {
        if (subcategories) {
            subcategories.forEach((subcategory: ISubcategory) => {
                if (subcategory._id === subcategoryId) {
                    sessionStorage.setItem(
                        "subcategory_title",
                        subcategory.name.charAt(0).toUpperCase() +
                            subcategory.name.slice(1)
                    );
                }
            });
        }
    }, [subcategories, subcategoryId]);

    const subcategoryTitle = sessionStorage.getItem("subcategory_title");

    const handelImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct({
            ...newProduct,
            img: e.target.files?.[0] || "",
        });
        e.target.files?.[0].name && setFileName(e.target.files?.[0].name);
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.header}
                style={
                    isDialogOpen
                        ? {
                              filter: "blur(5px)",
                              pointerEvents: "none",
                          }
                        : {}
                }
            >
                <div className={styles.back_button}>
                    <BackButton />
                </div>
                <div className={styles.category_title}>{subcategoryTitle}</div>
                <button
                    className={styles.add_button}
                    onClick={() => setDialogOpen(true)}
                >
                    <Add />
                </button>
            </div>
            {isDialogOpen && (
                <dialog open>
                    <form>
                        <label className={styles.add_product_title}>
                            Title:
                            <input
                                type="text"
                                name="title"
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <label className={styles.add_product_description}>
                            Description:
                            <textarea
                                name="description"
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <label className={styles.add_product_rating}>
                            Rating:
                            <input
                                type="range"
                                name="rating"
                                min="1"
                                max="5"
                                value={newProduct.rating}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        rating: parseInt(e.target.value, 6),
                                    })
                                }
                            />
                            {newProduct.rating}
                        </label>
                        <br />
                        <div className={styles.add_product_buy}>
                            Buy:
                            {!newProduct.buy ? (
                                <button
                                    type="button"
                                    className={styles.add_product_buy_button}
                                    onClick={() =>
                                        setNewProduct({
                                            ...newProduct,
                                            buy: true,
                                        })
                                    }
                                >
                                    <div className={styles.button_dislike}>
                                        <Dislike />
                                    </div>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className={styles.add_product_buy_button}
                                    onClick={() =>
                                        setNewProduct({
                                            ...newProduct,
                                            buy: false,
                                        })
                                    }
                                >
                                    <div className={styles.button_like}>
                                        <Like />
                                    </div>
                                </button>
                            )}
                        </div>
                        <br />
                        <label>
                            Click to upload an image
                            <input
                                type="file"
                                accept="image/png, image/jpg"
                                onChange={(e) => handelImageUpload(e)}
                            />
                        </label>
                        <span className={styles.add_product_filename}>
                            {fileName}
                        </span>
                        <br />
                        <div className={styles.add_product_buttons}>
                            <button type="submit" onClick={addNewProduct}>
                                Submit
                            </button>
                            <button
                                onClick={() => {
                                    setDialogOpen(false);
                                    setFileName("");
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </dialog>
            )}
            {!isLoading ? (
                <>
                    {products &&
                        products.map((product: IProduct) => (
                            <div
                                key={product._id}
                                style={
                                    isDialogOpen
                                        ? {
                                              filter: "blur(5px)",
                                              pointerEvents: "none",
                                          }
                                        : {}
                                }
                            >
                                <ProductCard
                                    product={product}
                                    categoryId={categoryId}
                                    subcategoryId={subcategoryId}
                                />
                            </div>
                        ))}
                </>
            ) : null}
        </div>
    );
};

export default ProductsPage;
