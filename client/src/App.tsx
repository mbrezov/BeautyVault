import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Homepage from "./pages/HomePage/HomePage";
import SubcategoryPage from "./pages/SubcategoryPage/SubcategoryPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import styles from "./App.module.scss";
import { ICategory } from "./interfaces/interface";

function App() {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/category")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    console.log(categories);

    return (
        <BrowserRouter>
            <div className={styles.container}>
                <Routes>
                    <Route
                        path="/"
                        element={<Homepage categories={categories} />}
                    />
                    <Route path="/:categoryId" element={<SubcategoryPage />} />
                    <Route
                        path="/:categoryId/:subcategoryId"
                        element={<ProductsPage />}
                    />
                    <Route
                        path="/:categoryId/:subcategoryId/:productId"
                        element={<ProductPage />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
