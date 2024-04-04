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
import { Hearts } from "react-loader-spinner";
import styles from "./ProductsPage.module.scss";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProductsPage = () => {
    const { products, dispatch } = useProductsContext();
    const { subcategories } = useSubcategoryContext();
    const { categoryId, subcategoryId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fileName, setFileName] = useState("");
    const [subcategoryTitle, setSubcategoryTitle] = useState<string | null>();
    const [newProduct, setNewProduct] = useState<INewProduct>({
        title: "",
        description: "",
        rating: 0,
        buy: false,
        img: "",
    });
    const { user } = useAuthContext();
    const api = process.env.REACT_APP_PRODUCTS;

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
        setSubcategoryTitle(sessionStorage.getItem("subcategory_title"));
    }, [subcategories, subcategoryId]);

    useEffect(() => {
        if (api && categoryId && subcategoryId) {
            user &&
                axios
                    .get(
                        api
                            .replace("categoryId", categoryId)
                            .replace("subcategoryId", subcategoryId),
                        {
                            headers: { Authorization: `Bearer ${user.token}` },
                        }
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
    }, [api, categoryId, subcategoryId, dispatch, user]);

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
                            Authorization: `Bearer ${user.token}`,
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
                    <SquaresPlusIcon
                        style={{
                            width: "30px",
                            height: "30px",
                            color: "black",
                        }}
                    />
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
                                placeholder="Max length of the title is 100 characters"
                                maxLength={100}
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
                                maxLength={700}
                                name="description"
                                placeholder="Max length of the description is 700 characters"
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
                                        <HandThumbDownIcon
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                            }}
                                        />
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
                                        <HandThumbUpIcon
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                            }}
                                        />
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
            {isLoading ? (
                <Hearts
                    height="150"
                    width="150"
                    color="#839788"
                    ariaLabel="hearts-loading"
                    wrapperStyle={{ marginTop: "150px" }}
                    wrapperClass=""
                    visible={true}
                />
            ) : products && products.length > 0 ? (
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
            ) : (
                <div
                    className={styles.no_content}
                    style={
                        isDialogOpen
                            ? {
                                  filter: "blur(5px)",
                                  pointerEvents: "none",
                              }
                            : {}
                    }
                >
                    To add a product, please press the '+' button.
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
