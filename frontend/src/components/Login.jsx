import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginFrom, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.log(error);
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          email: emailId,
          password,
          firstName,
          lastName,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.user));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginFrom ? "Login" : "Signup"}
          </h2>
          <div>
            <div className="mb-4">
              {!isLoginFrom && (
                <>
                  {" "}
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">First Name</span>
                    </div>
                    <input
                      type="text"
                      placeholder=""
                      className="input input-bordered w-full max-w-xs"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input
                      type="text"
                      placeholder=""
                      className="input input-bordered w-full max-w-xs"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>{" "}
                </>
              )}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email Id</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <p className="text-red-600">{error}</p>
            </div>
          </div>

          <div className="card-actions justify-center py-3">
            <button
              className="btn btn-primary"
              onClick={isLoginFrom ? handleLogin : handleSignup}
            >
              {isLoginFrom ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className="text-sm text-gray-500 flex justify-center  cursor-pointer"
            onClick={() => setIsLoginForm(!isLoginFrom)}
          >
            {isLoginFrom ? "New User? Signup here" : "Existing User login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
