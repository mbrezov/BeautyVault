import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error, isLoading } = useSignup();

    const handleSignup = async (e: any) => {
        e.preventDefault();

        await signup(email, password);
    };

    return (
        <div>
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
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={isLoading}>SUBMIT</button>
                {error && <div>{error.error}</div>}
            </form>
            <NavLink to="/login">
                <div>Login</div>
            </NavLink>
        </div>
    );
};

export default SignupPage;
