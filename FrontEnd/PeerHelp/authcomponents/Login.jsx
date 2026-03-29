import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8426/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", res.data.token);
            setMessage("Login successful");
            navigate("/dashboard");

        } catch (err) {
            if (!err.response) {
                setMessage("Network error");
                return;
            }

            const status = err.response.status;

            switch (status) {
                case 404:
                    setMessage("User not registered");
                    break;

                case 401:
                    setMessage("Invalid password");
                    break;

                case 403:
                    setMessage("Verify your email before login");
                    break;

                case 500:
                    setMessage("Server error");
                    break;

                default:
                    setMessage(err.response.data.message || "Error");
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;