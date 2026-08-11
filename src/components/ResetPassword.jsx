import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../utils/constants";

const ResetPassword = () => {

    // Get token from URL
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    // Password states
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Token state
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isCheckingToken, setIsCheckingToken] = useState(true);

    // For redirecting to login
    const navigate = useNavigate();

    // Verify token when page loads
    useEffect(() => {

        const verifyToken = async () => {
            try {

                if (!token) {
                    setIsTokenValid(false);
                    setIsCheckingToken(false);
                    return;
                }

                const res = await axios.get(
                    BaseURL + "/reset-password/verify",
                    {
                        params: {
                            token: token
                        }
                    }
                );

                console.log(res.data);

                setIsTokenValid(true);

            } catch (err) {

                console.error("Token verification error:", err);

                setIsTokenValid(false);

            } finally {

                setIsCheckingToken(false);

            }
        };

        verifyToken();

    }, [token]);


    // Reset password
    const handleResetPassword = async () => {
        try {

            // Check token
            if (!token || !isTokenValid) {
                alert("Invalid or expired password reset link");
                return;
            }

            // Check passwords
            if (newPassword !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            // Send token and new password to backend
            const res = await axios.post(
                BaseURL + "/reset-password",
                {
                    token,
                    newPassword
                }
            );

            console.log(res.data);

            alert("Password reset successful");

            navigate("/login");

        } catch (err) {

            console.error("Reset password error:", err);

            alert(
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Something went wrong"
            );
        }
    };


    // While checking token
    if (isCheckingToken) {
        return <h2>Checking password reset link...</h2>;
    }


    // Token is invalid or expired
    if (!isTokenValid) {
        return (
            <div>
                <h1>Invalid Password Reset Link</h1>

                <p>
                    This password reset link is invalid or has expired.
                </p>

                <button onClick={() => navigate("/login")}>
                    Go to Login
                </button>
            </div>
        );
    }


    // Token is valid
    return (
        <div>
            <h1>Reset Password</h1>

            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button onClick={handleResetPassword}>
                Reset Password
            </button>
        </div>
    );
};

export default ResetPassword;