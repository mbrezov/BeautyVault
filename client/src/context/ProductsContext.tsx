import { createContext, useReducer } from "react";

export const ProductsContext = createContext<any>(null);

export const productsReducer = (state: any, action: any) => {
    switch (action.type) {
        //returns all products object => used in products page
        case "GET_PRODUCTS":
            return {
                products: action.payload,
            };
        //returns single product object => used in product page
        case "GET_PRODUCT":
            return {
                product: action.payload,
            };
        //creates a new product and adds it to the products array
        case "CREATE_PRODUCT":
            //state.products is the old state, if we have 1 product and create another, after this case console.log will be 1 product
            return {
                products: [action.payload, ...state.products],
            };
        case "DELETE_PRODUCT":
            return {
                products: state.products.filter(
                    (product: any) => product._id !== action.payload
                ),
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
