import { useContext } from "react";
import { SubcategoryContext } from "../context/SubcategoryContext";

export const useSubcategoryContext = () => {
    const context = useContext(SubcategoryContext);

    if (!context) {
        throw Error(
            "useSubcategoryContext must be inside SubcategoryContextProvider"
        );
    }

    return context;
};
