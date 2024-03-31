import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductsContextProvider } from "./context/ProductsContext";
import { SubcategoryContextProvider } from "./context/SubcategoryContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <>
        <AuthContextProvider>
            <SubcategoryContextProvider>
                <ProductsContextProvider>
                    <App />
                </ProductsContextProvider>
            </SubcategoryContextProvider>
        </AuthContextProvider>
    </>
);
