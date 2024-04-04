import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage/HomePage";
import SubcategoryPage from "./pages/SubcategoryPage/SubcategoryPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import styles from "./App.module.scss";
import { SkeletonTheme } from "react-loading-skeleton";
import AuthPage from "./pages/AuthPage/AuthPage";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
    const { user } = useAuthContext();
    return (
        <SkeletonTheme baseColor="#839788" highlightColor="#b0bbb0">
            <BrowserRouter>
                <div className={styles.container}>
                    <Routes>
                        <Route
                            index
                            element={
                                !user ? <AuthPage /> : <Navigate to="/home" />
                            }
                        />

                        <Route
                            path="/home"
                            element={user ? <Homepage /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/:categoryId"
                            element={
                                user ? <SubcategoryPage /> : <Navigate to="/" />
                            }
                        />

                        <Route
                            path="/:categoryId/:subcategoryId"
                            element={
                                user ? <ProductsPage /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/:categoryId/:subcategoryId/:productId"
                            element={
                                user ? <ProductPage /> : <Navigate to="/" />
                            }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </SkeletonTheme>
    );
}

export default App;
