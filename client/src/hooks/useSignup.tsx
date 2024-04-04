import axios from "axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [signupError, setSignupError] = useState<any>(null);
    const [isSignupLoading, setIsSignupLoading] = useState(Boolean);
    const { dispatch } = useAuthContext();

    const signup = async (email: string, password: string) => {
        setIsSignupLoading(true);

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

                setIsSignupLoading(false);
            } catch (error) {
                setIsSignupLoading(false);
                const err = error as AxiosError;
                setSignupError(err.response?.data);
            }
        } else {
            console.error(
                "REACT_APP_SIGNUP environment variable is not defined."
            );
        }
    };

    return { signup, isSignupLoading, signupError };
};
