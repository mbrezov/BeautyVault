import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage/HomePage";
import SubcategoryPage from "./pages/SubcategoryPage/SubcategoryPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import styles from "./App.module.scss";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
    return (
        <SkeletonTheme baseColor="#839788" highlightColor="#b0bbb0">
            <BrowserRouter>
                <div className={styles.container}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/" element={<Homepage />} />
                        <Route
                            path="/:categoryId"
                            element={<SubcategoryPage />}
                        />

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
        </SkeletonTheme>
    );
}

export default App;
