import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext<any>(null);

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (user) {
            dispatch({
                type: "LOGIN",
                payload: user,
            });
        }
    }, []);

    console.log("AuthContesxt state: ", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
