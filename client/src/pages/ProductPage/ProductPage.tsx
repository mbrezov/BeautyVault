import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductPage = () => {
    const { categoryId, subcategoryId } = useParams();
    const [productData, setProductData] = useState([]);

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

    return <div>da</div>;
};

export default ProductPage;
