import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useLogin } from "../../hooks/useLogin";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import styles from "./AuthPage.module.scss";
import logo from "../../img/logo.png";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

type AuthState = "login" | "signup";

const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { signup, signupError, isSignupLoading } = useSignup();
    const { login, isLoginLoading, loginError } = useLogin();
    const [authMethod, setAuthMethod] = useState<AuthState>("login");
    const [showPassowrd, setShowPassword] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        await signup(email, password, confirmPassword);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className={styles.container}>
            <img src={logo} alt="error" width="128" height="128" />
            {authMethod === "login" ? (
                <form onSubmit={handleLogin}>
                    <h1>Welcome back!</h1>
                    <p>Login to your account</p>
                    <span>
                        <EnvelopeIcon
                            style={{
                                width: "24px",
                                height: "24px",
                                color: "black",
                                marginLeft: "10px",
                                marginRight: "10px",
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </span>
                    <span>
                        <LockClosedIcon
                            style={{
                                width: "24px",
                                height: "24px",
                                color: "black",
                                marginLeft: "10px",
                                marginRight: "10px",
                            }}
                        />
                        <input
                            placeholder="Password"
                            type={showPassowrd ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassowrd)}
                        >
                            {showPassowrd ? (
                                <EyeSlashIcon
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        color: "black",
                                    }}
                                />
                            ) : (
                                <EyeIcon
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        color: "black",
                                    }}
                                />
                            )}
                        </button>
                    </span>
                    {loginError && (
                        <div className={styles.error_message}>
                            {loginError.error}
                        </div>
                    )}
                    <button
                        disabled={isLoginLoading}
                        className={styles.submit_button}
                    >
                        Login
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSignup}>
                    <h1>Sign up</h1>
                    <p>Create your account</p>
                    <span>
                        <EnvelopeIcon
                            style={{
                                width: "24px",
                                height: "24px",
                                color: "black",
                                marginLeft: "10px",
                                marginRight: "10px",
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </span>
                    <span>
                        <LockClosedIcon
                            style={{
                                width: "24px",
                                height: "24px",
                                color: "black",
                                marginLeft: "10px",
                                marginRight: "10px",
                            }}
                        />
                        <input
                            placeholder="Password"
                            type={showPassowrd ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassowrd)}
                        >
                            {showPassowrd ? (
                                <EyeSlashIcon
                                    style={{ width: "20px", height: "20px" }}
                                />
                            ) : (
                                <EyeIcon
                                    style={{ width: "20px", height: "20px" }}
                                />
                            )}
                        </button>
                    </span>
                    <span>
                        <LockClosedIcon
                            style={{
                                width: "24px",
                                height: "24px",
                                color: "black",
                                marginLeft: "10px",
                                marginRight: "10px",
                            }}
                        />
                        <input
                            placeholder="Confirm password"
                            type={showPassowrd ? "text" : "password"}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassowrd)}
                        >
                            {showPassowrd ? (
                                <EyeSlashIcon
                                    style={{ width: "20px", height: "20px" }}
                                />
                            ) : (
                                <EyeIcon
                                    style={{ width: "20px", height: "20px" }}
                                />
                            )}
                        </button>
                    </span>
                    {signupError && (
                        <div className={styles.error_message}>
                            {signupError.error
                                ? signupError.error
                                : signupError}
                        </div>
                    )}
                    <button
                        disabled={isSignupLoading}
                        className={styles.submit_button}
                    >
                        Signup
                    </button>
                </form>
            )}
            {authMethod === "signup" ? (
                <div className={styles.switch_message}>
                    <p>Already have an account?</p>
                    <button onClick={() => setAuthMethod("login")}>
                        Login
                    </button>
                </div>
            ) : (
                <div className={styles.switch_message}>
                    <p>Don't have an account?</p>
                    <button onClick={() => setAuthMethod("signup")}>
                        Sign up
                    </button>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
