import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useLogin } from "../../hooks/useLogin";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type AuthState = "login" | "signup";

const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, signupError, isSignupLoading } = useSignup();
    const { login, isLoginLoading, loginError } = useLogin();
    const [authMethod, setAuthMethod] = useState<AuthState>("login");

    const [showPassowrd, setShowPassword] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        await signup(email, password);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div>
            {authMethod === "login" ? (
                <form
                    onSubmit={handleLogin}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <h3>Login up</h3>

                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <button disabled={isLoginLoading}>SUBMIT</button>
                    {loginError && <div>{loginError.error}</div>}
                </form>
            ) : (
                <form
                    onSubmit={handleSignup}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <h3>Sign up</h3>

                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <label>Password:</label>
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
                    <input
                        type={showPassowrd ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <button disabled={isSignupLoading} type="submit">
                        SUBMIT
                    </button>
                    {signupError && <div>{signupError.error}</div>}
                </form>
            )}
            <button
                onClick={() =>
                    setAuthMethod(authMethod === "login" ? "signup" : "login")
                }
            >
                {authMethod === "signup" ? <h1>Login</h1> : <h1>Signup</h1>}
            </button>
        </div>
    );
};

export default AuthPage;
