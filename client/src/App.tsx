import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage/HomePage";
import SubcategoryPage from "./pages/SubcategoryPage/SubcategoryPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import { ICategory } from "./interfaces/interface";
import styles from "./App.module.scss";

function App() {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const api = process.env.REACT_APP_CATEGORIES;

        if (api) {
            axios
                .get(api)
                .then((res) => {
                    setCategories(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching categories:", error);
                });
        } else {
            console.error(
                "REACT_APP_CATEGORIES environment variable is not defined."
            );
        }
    }, []);

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
