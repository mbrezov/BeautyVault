import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProductsContextProvider } from "./context/ProductsContext";
import { SubcategoryContextProvider } from "./context/SubcategoryContext";
import { AuthContextProvider } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <>
        <AuthContextProvider>
            <SubcategoryContextProvider>
                <ProductsContextProvider>
                    <MantineProvider>
                        <App />
                    </MantineProvider>
                </ProductsContextProvider>
            </SubcategoryContextProvider>
        </AuthContextProvider>
    </>
);
