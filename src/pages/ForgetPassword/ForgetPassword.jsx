import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Bars } from "react-loader-spinner";

const ForgetPassword = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");

  const inputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: " ",
    }));
  };
  const [errors, setErrors] = useState({
    email: "",
  });

  const handleSubmit = () => {
    let emailReges = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newError = {};
    if (!userData.email) {
      newError.email = "Please enter an email address";
    } else if (!emailReges.test(userData.email)) {
      newError.email = "Please enter a valid email address";
    }
    if (Object.keys(newError).length > 0) {
      setErrors(newError);
      return;
    }
    if (userData.email && emailReges.test(userData.email)) {
      setLoading(true);
      sendPasswordResetEmail(auth, userData.email)
        .then(() => {
          setLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          // ..
        });
    }
  };

  /*   const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
    setErrors({ ...errors, [field]: "" });
  }; */

  return (
    <div>
      <div className="flex justify-end items-center">
        <div>
          <h1 className="font-sans text-[34px] font-bold text-dBlue">
            Forgot Your Password?
          </h1>
          <p className="text-dBlue my-4">
            Enter email address to reset your password.
          </p>

          <div>
            <div className="relative select-none">
              <input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                /* onChange={(val) => handleChange("email", val)} */
                onChange={inputChange}
                className={`pl-[52px] mt-4 text-xl border w-[368px] outline-none border-opacity-30 ${
                  errors.email ? "border-red-500 animate-shake" : "border-dBlue"
                }  py-[22px] focus:border-opacity-80  rounded-lg peer bg-transparent`}
              />
              <label
                htmlFor="email"
                className={`absolute left-[34px] font-nun text-sm opactiy-70 text-dBlue px-[18px] bg-white peer-focus:top-2  
                ${userData ? "top-2" : "top-10"}
                transition-all duration-300 tracking-[1px]`}
              >
                Email address
              </label>
            </div>
            <p className="text-red-500 mb-8 pl-[52px]">{errors.email}</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-4">
              <Bars
                height="40"
                width="60"
                color="#5F35F5"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="py-6 mt-1 scale-110 rounded-lg font-semibold text-xl font-sans px-[122px] bg-primary text-white"
            >
              Reset Password
            </button>
          )}

          <p className="font-bold cursor-pointer text-[#EA6C00] my-4 text-center">
            <Link to="/login">Login with password</Link>
          </p>
        </div>
        <img
          className="object-cover h-screen w-1/2 ml-[145px]"
          src="../../../src/assets/Girl_Browsing_Phone.png"
        />
      </div>
    </div>
  );
};

export default ForgetPassword;
