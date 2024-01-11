import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { IProduct } from "../../interfaces/interface";

interface INewProduct {
    title: string;
    description: string;
    rating: number;
    buy: boolean;
}

const ProductsPage = () => {
    const { categoryId, subcategoryId } = useParams();
    const [productData, setProductData] = useState<IProduct[]>([]);
    const [newProduct, setNewProduct] = useState<INewProduct>({
        title: "",
        description: "",
        rating: 0,
        buy: false,
    });

    useEffect(() => {
        axios
            .get(
                `http://localhost:4000/api/category/${categoryId}/subcategory/${subcategoryId}/products`
            )
            .then((res) => {
                setProductData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching product data", error);
            });
    }, [categoryId, subcategoryId]);

    console.log(productData);

    const addNewProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:4000/api/category/${categoryId}/subcategory/${subcategoryId}/products`,
                {
                    title: newProduct.title,
                    description: newProduct.description,
                    rating: newProduct.rating,
                    buy: newProduct.buy,
                }
            );
            console.log(response);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
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
                <button type="submit">Submit</button>
            </form>
            {productData.map((product: IProduct) => (
                <div key={product._id}>
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
