import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function OTPVerify() {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    // get email passed from signup
    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setMessage("Email missing. Please signup again.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8426/api/auth/verifyotp",
                {
                    email,
                    otp
                }
            );

            setMessage("Email verified successfully");

            // 👉 after verification → go to login
            navigate("/");

        } catch (err) {
            if (!err.response) {
                setMessage("Network error");
                return;
            }

            const status = err.response.status;

            switch (status) {
                case 404:
                    setMessage("User not found");
                    break;

                case 400:
                    setMessage(err.response.data.message); // invalid or expired OTP
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
            <h2>OTP Verification</h2>

            <form onSubmit={handleSubmit}>
                <label>Enter OTP</label>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <button type="submit">Verify</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default OTPVerify;