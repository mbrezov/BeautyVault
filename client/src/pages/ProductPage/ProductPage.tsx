import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/interface";

const ProductPage = () => {
    const { categoryId, subcategoryId, productId } = useParams();
    const [productData, setProductData] = useState<IProduct[]>([]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:4000/api/category/${categoryId}/subcategory/${subcategoryId}/products/${productId}`
            )
            .then((res) => {
                setProductData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching product data", error);
            });
    }, [categoryId, subcategoryId, productId]);

    console.log(productData);

    return <div>da</div>;
};

export default ProductPage;
