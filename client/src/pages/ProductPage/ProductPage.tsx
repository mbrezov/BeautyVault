import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductPage = (props: any) => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/products")
            .then((res) => {
                setProductData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching product data", error);
            });
    }, []);

    console.log(productData);

    return (
        <div>
            {productData.map(
                (product: any) =>
                    product.SubCategory === "6591748af49a048802dc3c0c" && (
                        <div key={product._id}>
                            <ProductCard title={product.title} />
                        </div>
                    )
            )}
        </div>
    );
};

export default ProductPage;
