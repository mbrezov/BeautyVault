import { createContext, useReducer } from "react";

export const SubcategoryContext = createContext<any>(null);

export const subcategoryReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_SUBCATEGORIES":
            return {
                subcategories: action.payload,
            };
        case "SET_SUBCATEGORY":
            return {
                subcategory: action.payload,
            };
        case "CREATE_SUBCATEGORY":
            return {
                subcategories: [action.payload, ...state.subcategories],
            };
        case "DELETE_SUBCATEGORY":
            return {
                subcategories: state.subcategories.filter(
                    (subcategory: any) => subcategory._id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export const SubcategoryContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(subcategoryReducer, {
        subcategories: null,
    });

    return (
        <SubcategoryContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SubcategoryContext.Provider>
    );
};
