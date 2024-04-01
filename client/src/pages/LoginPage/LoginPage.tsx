import { useState } from "react";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: any) => {
        e.preventDefault();

        console.log(email, password);
    };

    return (
        <div>
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

                <button>SUBMIT</button>
            </form>
            <NavLink to="/signup">
                <div>Sign up</div>
            </NavLink>
        </div>
    );
};

export default LoginPage;
