import { AxiosError } from "axios";
import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(Boolean);
    const { dispatch } = useAuthContext();

    const signup = async (email: string, password: string) => {
        setIsLoading(true);

        const api = process.env.REACT_APP_SIGNUP;

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

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                const err = error as AxiosError;
                setError(err.response?.data);
            }
        } else {
            console.error(
                "REACT_APP_SIGNUP environment variable is not defined."
            );
        }
    };

    return { signup, isLoading, error };
};
