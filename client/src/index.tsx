import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductsContextProvider } from "./context/ProductsContext";
import { SubcategoryContextProvider } from "./context/SubcategoryContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <SubcategoryContextProvider>
            <ProductsContextProvider>
                <App />
            </ProductsContextProvider>
        </SubcategoryContextProvider>
    </React.StrictMode>
);
