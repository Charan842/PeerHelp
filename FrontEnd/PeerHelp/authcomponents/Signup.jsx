import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8426/api/auth/signup",
                {
                    username,
                    email,
                    password
                }
            );

            setMessage("OTP sent to your email babu!!!!!!");
            navigate("/OTPVerification", { state: { email } });


        } catch (err) {
            if (!err.response) {
                setMessage("Network error");
                return;
            }

            const status = err.response.status;

            switch (status) {
                case 400:
                    setMessage("Email already exists");
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
            <h2>Signup</h2>

            <form onSubmit={handleSubmit}>
                <label>UserName</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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

                <button type="submit">Signup</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Signup;