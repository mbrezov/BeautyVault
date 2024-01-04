import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";

const ProductsPage = (props: any) => {
    const [productData, setProductData] = useState([]);
    const { categoryId, subcategoryId } = useParams();

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

    return (
        <div>
            {productData.map((product: any) => (
                <div key={product._id}>
                    <ProductCard
                        title={product.title}
                        buy={product.buy}
                        rating={product.rating}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductsPage;
