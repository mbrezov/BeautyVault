import axios from "axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [loginError, setLoginError] = useState<any>(null);
    const [isLoginLoading, setIsLoginLoading] = useState(Boolean);
    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setIsLoginLoading(true);

        const api = process.env.REACT_APP_LOGIN;

        if (api) {
            try {
                const response = await axios.post(api, {
                    email: email,
                    password: password,
                });

                // save user to local storage
                localStorage.setItem("user", JSON.stringify(response.data));

                //update the auth context
                dispatch({ type: "LOGIN", payload: response.data });

                setIsLoginLoading(false);
            } catch (error) {
                setIsLoginLoading(false);
                const err = error as AxiosError;
                setLoginError(err.response?.data);
            }
        } else {
            console.error(
                "REACT_APP_LOGIN environment variable is not defined."
            );
        }
    };

    return { login, isLoginLoading, loginError };
};
