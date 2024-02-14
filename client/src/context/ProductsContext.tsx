import { createContext, useReducer } from "react";

export const ProductsContext = createContext<any>(null);

export const productsReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                products: action.payload,
            };
        case "SET_PRODUCT":
            return {
                product: action.payload,
            };
        case "CREATE_PRODUCT":
            return {
                products: [action.payload, ...state.products],
            };
        default:
            return state;
    }
};

export const ProductsContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(productsReducer, {
        products: null,
    });

    return (
        <ProductsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProductsContext.Provider>
    );
};
