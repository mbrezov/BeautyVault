import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/interface";

const ProductPage = () => {
    const { categoryId, subcategoryId, productId } = useParams();
    const [productData, setProductData] = useState<IProduct>();

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
                    setProductData(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching product data", error);
                });
        } else {
            console.error(
                "REACT_APP_PRODUCT environment variable is not defined."
            );
        }
    }, [api, categoryId, subcategoryId, productId]);

    return (
        <div>
            <h1>{productData?.title}</h1>
            <div> {productData?.description}</div>
            <div>{productData?.rating}</div>
            {productData?.buy === true ? (
                <div>Kupi</div>
            ) : (
                <div>nemoj kupiti</div>
            )}
        </div>
    );
};

export default ProductPage;
