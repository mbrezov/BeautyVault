import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Homepage from "./pages/HomePage/HomePage";
import SubCategoryPage from "./pages/SubCategoryPage/SubCategoryPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import styles from "./App.module.scss";

function App() {
    const [categories, setCategories] = useState([]);

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

    //console.log(categories);

    return (
        <BrowserRouter>
            <div className={styles.container}>
                <Routes>
                    <Route path="/" element={<Homepage data={categories} />} />
                    <Route
                        path="/:categoryId"
                        element={<SubCategoryPage data={categories} />}
                    />
                    <Route
                        path="/:categoryId/:subcategoryId"
                        element={<ProductsPage />}
                    />
                    {/*   <Route
                    path="/:categoryId/:subcategoryId/:productId"
                    element={<ProductPage />}
                /> */}
                </Routes>
            </div>
        </BrowserRouter>
    );

    /*     return (
        <BrowserRouter>
            <div className={styles.container}>
                <Routes>
                    <Route
                        path="/"
                        element={<Homepage category={categories} />}
                    />
                    {categories.map((category: any) => (
                        <React.Fragment key={category._id}>
                            <Route
                                path={`/${category.name}`}
                                element={
                                    <SubCategoryPage
                                        category={category.name}
                                        categoryId={category._id}
                                    />
                                }
                            />
                            <Route
                                path={`/${category.name}/ruž`}
                                element={<ProductPage />}
                            />
                        </React.Fragment>
                    ))}
                </Routes>
            </div>
        </BrowserRouter>
    ); */
}

export default App;
