import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../utils/constants";

const Login = () => {

  const [emailId, setEmailId] = useState("anurag@gmail.com");
  const [password, setPassword] = useState("Anurag@09");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);

  // Forgot password mode
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  // ================= LOGIN =================

  const handleLogin = async () => {

    setError("");
    setSuccess("");

    try {

      const res = await axios.post(
        BaseURL + "/login",
        {
          emailId,
          password
        },
        {
          withCredentials: true
        }
      );

      dispatch(addUser(res.data));

      if (res.data.profileCompleted) {

        navigate("/");

      } else {

        navigate("/profile/setup");

      }

    } catch (err) {

      setError(
        err.response?.data ||
        "Login failed. Please try again."
      );

      console.error(err);
    }
  };


  // ================= SIGNUP =================

  const handleSignUp = async () => {

    setError("");
    setSuccess("");

    try {

      const res = await axios.post(
        BaseURL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password
        },
        {
          withCredentials: true
        }
      );

      dispatch(addUser(res.data.data));

      navigate("/profile/setup");

    } catch (err) {

      setError(
        err?.response?.data ||
        "Something went wrong"
      );
    }
  };


  // ================= FORGOT PASSWORD =================

  const handleForgotPassword = async () => {

    setError("");
    setSuccess("");

    if (!emailId.trim()) {

      setError(
        "Please enter your email address."
      );

      return;
    }

    try {

      await axios.post(
        BaseURL + "/forgot-password",
        {
          emailId: emailId.trim()
        }
      );

      setSuccess(
        "Reset link sent to your email. Please check your inbox."
      );

    } catch (err) {

      console.error(
        "Forgot password error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Unable to send reset link. Please try again."
      );
    }
  };


  // ================= FORGOT PASSWORD PAGE =================

  if (isForgotPassword) {

    return (

      <div className="flex justify-center my-10 px-4">

        <div className="card bg-base-300 w-96 shadow-xl">

          <div className="card-body">

            <h2 className="card-title justify-center text-2xl">
              Forgot Password?
            </h2>

            <p className="text-center opacity-70 mt-2">
              Enter your registered email address and
              we'll send you a password reset link.
            </p>


            {/* EMAIL */}

            <label className="form-control w-full max-w-xs my-4">

              <div className="label">

                <span className="label-text">
                  Email ID
                </span>

              </div>

              <input
                type="email"
                placeholder="Enter your email"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setEmailId(e.target.value)
                }
              />

            </label>


            {/* ERROR */}

            {error && (

              <p className="text-red-500 text-sm text-center">
                {error}
              </p>

            )}


            {/* SUCCESS */}

            {success && (

              <div className="alert alert-success mt-2">

                <span>
                  {success}
                </span>

              </div>

            )}


            {/* SEND LINK */}

            <div className="card-actions justify-center mt-3">

              <button
                className="btn btn-primary w-full"
                onClick={handleForgotPassword}
              >
                Get Reset Link
              </button>

            </div>


            {/* BACK TO LOGIN */}

            <p
              className="text-center cursor-pointer mt-4 hover:underline"
              onClick={() => {

                setIsForgotPassword(false);
                setError("");
                setSuccess("");

              }}
            >
              ← Back to Login
            </p>

          </div>

        </div>

      </div>
    );
  }


  // ================= LOGIN / SIGNUP =================

  return (

    <div className="flex justify-center my-10">

      <div className="card bg-base-300 w-96 shadow-xl">

        <div className="card-body">

          <h2 className="card-title justify-center">

            {isLoginForm
              ? "Login"
              : "Sign Up"}

          </h2>


          <div>

            {/* FIRST NAME / LAST NAME */}

            {!isLoginForm && (

              <>

                <label className="form-control w-full max-w-xs my-2">

                  <div className="label">

                    <span className="label-text">
                      First Name
                    </span>

                  </div>

                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                  />

                </label>


                <label className="form-control w-full max-w-xs my-2">

                  <div className="label">

                    <span className="label-text">
                      Last Name
                    </span>

                  </div>

                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                  />

                </label>

              </>

            )}


            {/* EMAIL */}

            <label className="form-control w-full max-w-xs my-2">

              <div className="label">

                <span className="label-text">
                  Email ID
                </span>

              </div>

              <input
                type="email"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setEmailId(e.target.value)
                }
              />

            </label>


            {/* PASSWORD */}

            <label className="form-control w-full max-w-xs my-2">

              <div className="label">

                <span className="label-text">
                  Password
                </span>

              </div>

              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </label>

          </div>


          {/* ERROR */}

          {error && (

            <p className="text-red-500 text-sm">
              {error}
            </p>

          )}


          {/* LOGIN / SIGNUP BUTTON */}

          <div className="card-actions justify-center m-2">

            <button
              className="btn btn-primary"
              onClick={
                isLoginForm
                  ? handleLogin
                  : handleSignUp
              }
            >

              {isLoginForm
                ? "Login"
                : "Sign Up"}

            </button>

          </div>


          {/* FORGOT PASSWORD */}

          {isLoginForm && (

            <p
              className="text-center text-primary cursor-pointer hover:underline"
              onClick={() => {

                setIsForgotPassword(true);
                setError("");
                setSuccess("");

              }}
            >
              Forgot Password?
            </p>

          )}


          {/* SWITCH LOGIN / SIGNUP */}

          <p
            className="m-auto cursor-pointer py-2 hover:underline"
            onClick={() => {

              setIsLoginForm(
                (value) => !value
              );

              setError("");
              setSuccess("");

            }}
          >

            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}

          </p>

        </div>

      </div>

    </div>

  );
};

export default Login;