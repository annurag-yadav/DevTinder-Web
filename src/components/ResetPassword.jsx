import { useState, useEffect } from "react";
import {
  useSearchParams,
  useNavigate
} from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../utils/constants";

const ResetPassword = () => {

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const navigate = useNavigate();


  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");


  const [isTokenValid, setIsTokenValid] =
    useState(false);

  const [isCheckingToken, setIsCheckingToken] =
    useState(true);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // ================= VERIFY TOKEN =================

  useEffect(() => {

    const verifyToken = async () => {

      try {

        if (!token) {

          setIsTokenValid(false);
          return;

        }

        await axios.get(
          BaseURL + "/reset-password/verify",
          {
            params: {
              token
            }
          }
        );

        setIsTokenValid(true);

      } catch (err) {

        console.error(
          "Token verification error:",
          err
        );

        setIsTokenValid(false);

      } finally {

        setIsCheckingToken(false);

      }
    };


    verifyToken();

  }, [token]);


  // ================= RESET PASSWORD =================

  const handleResetPassword = async () => {

    setError("");
    setSuccess("");


    if (!newPassword || !confirmPassword) {

      setError(
        "Please enter both passwords."
      );

      return;
    }


    if (newPassword !== confirmPassword) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    try {

      setLoading(true);


      await axios.post(
        BaseURL + "/reset-password",
        {
          token,
          newPassword
        }
      );


      setSuccess(
        "Password reset successfully. Redirecting to login..."
      );


      setTimeout(() => {

        navigate("/login");

      }, 2000);


    } catch (err) {

      console.error(
        "Reset password error:",
        err
      );

      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Unable to reset password."
      );

    } finally {

      setLoading(false);

    }
  };


  // ================= CHECKING TOKEN =================

  if (isCheckingToken) {

    return (

      <div className="flex justify-center my-20">

        <div className="card bg-base-300 w-96 shadow-xl">

          <div className="card-body text-center">

            <span className="loading loading-spinner loading-lg mx-auto"></span>

            <h2 className="text-xl mt-4">
              Checking reset link...
            </h2>

          </div>

        </div>

      </div>

    );
  }


  // ================= INVALID TOKEN =================

  if (!isTokenValid) {

    return (

      <div className="flex justify-center my-20 px-4">

        <div className="card bg-base-300 w-96 shadow-xl">

          <div className="card-body text-center">

            <h2 className="text-2xl font-bold text-error">
              Invalid Reset Link
            </h2>

            <p className="opacity-70 mt-3">

              This password reset link is
              invalid or has expired.

            </p>


            <button
              className="btn btn-primary mt-5"
              onClick={() =>
                navigate("/login")
              }
            >
              Go to Login
            </button>

          </div>

        </div>

      </div>

    );
  }


  // ================= RESET FORM =================

  return (

    <div className="flex justify-center my-20 px-4">

      <div className="card bg-base-300 w-96 shadow-xl">

        <div className="card-body">

          <h2 className="card-title justify-center text-2xl">

            Reset Password

          </h2>


          <p className="text-center opacity-70">

            Create a new password for your
            TalentLink account.

          </p>


          {/* NEW PASSWORD */}

          <label className="form-control w-full my-3">

            <div className="label">

              <span className="label-text">
                New Password
              </span>

            </div>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              className="input input-bordered w-full"
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
            />

          </label>


          {/* CONFIRM PASSWORD */}

          <label className="form-control w-full my-3">

            <div className="label">

              <span className="label-text">
                Confirm Password
              </span>

            </div>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              className="input input-bordered w-full"
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

          </label>


          {/* ERROR */}

          {error && (

            <div className="alert alert-error mt-2">

              <span>
                {error}
              </span>

            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div className="alert alert-success mt-2">

              <span>
                {success}
              </span>

            </div>

          )}


          {/* RESET BUTTON */}

          <button
            className="btn btn-primary w-full mt-4"
            onClick={handleResetPassword}
            disabled={loading}
          >

            {loading ? (

              <>
                <span className="loading loading-spinner"></span>
                Resetting...
              </>

            ) : (

              "Reset Password"

            )}

          </button>


          {/* BACK TO LOGIN */}

          <p
            className="text-center mt-4 cursor-pointer hover:underline"
            onClick={() =>
              navigate("/login")
            }
          >
            ← Back to Login
          </p>

        </div>

      </div>

    </div>

  );
};

export default ResetPassword;