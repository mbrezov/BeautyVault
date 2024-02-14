import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { BackButton } from "../../components/BackButton/BackButton";
import { IProduct } from "../../interfaces/interface";
import styles from "./ProductsPage.module.scss";
import { AddIcon } from "../../utility/icons";

interface INewProduct {
    title: string;
    description: string;
    rating: number;
    buy: boolean;
}

const ProductsPage = () => {
    const { categoryId, subcategoryId } = useParams();
    const [productData, setProductData] = useState<IProduct[]>([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<INewProduct>({
        title: "",
        description: "",
        rating: 0,
        buy: false,
    });

    const api = process.env.REACT_APP_PRODUCTS;

    useEffect(() => {
        if (api && categoryId && subcategoryId) {
            axios
                .get(
                    api
                        .replace("categoryId", categoryId)
                        .replace("subcategoryId", subcategoryId)
                )
                .then((res) => {
                    setProductData(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching product data", error);
                });
        } else {
            console.error(
                "REACT_APP_PRODUCTS environment variable is not defined."
            );
        }
    }, [api, categoryId, subcategoryId]);

    console.log(productData);

    const addNewProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (api && categoryId && subcategoryId) {
            try {
                const response = await axios.post(
                    api
                        .replace("categoryId", categoryId)
                        .replace("subcategoryId", subcategoryId),
                    {
                        title: newProduct.title,
                        description: newProduct.description,
                        rating: newProduct.rating,
                        buy: newProduct.buy,
                    }
                );
                console.log(response);
                setDialogOpen(false);
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.error(
                "REACT_APP_PRODUCTS environment variable is not defined."
            );
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.back_button}>
                    <BackButton />
                </div>
                <button
                    className={styles.add_button}
                    onClick={() => setDialogOpen(true)}
                >
                    <AddIcon />
                </button>
            </div>
            {isDialogOpen && (
                <dialog open>
                    <form onSubmit={addNewProduct}>
                        <label>
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
                        <label>
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
                        <label>
                            Rating:
                            <input
                                type="number"
                                name="rating"
                                value={newProduct.rating}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        rating: parseInt(e.target.value, 6),
                                    })
                                }
                            />
                        </label>
                        <br />
                        <label>
                            Buy:
                            <select
                                name="buy"
                                value={newProduct.buy ? "true" : "false"}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        buy: e.target.value === "true",
                                    })
                                }
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </label>
                        <br />
                        <label>
                            Click to upload an image
                            <input type="file" accept="image/png, image/jpg" />
                        </label>
                        <br />
                        <button type="submit">Submit</button>
                        <button onClick={() => setDialogOpen(false)}>
                            Cancel
                        </button>
                    </form>
                </dialog>
            )}
            {productData.map((product: IProduct) => (
                <div
                    key={product._id}
                    style={
                        isDialogOpen
                            ? { filter: "blur(5px)", pointerEvents: "none" }
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
        </div>
    );
};

export default ProductsPage;
