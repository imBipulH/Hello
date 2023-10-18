/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "../../index.css";

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    userName: "",
    password: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErr) => ({
      ...prevErr,
      [name]: "",
    }));
  };

  /*  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
  }); */
  const [errors, setErrors] = useState({
    email: "",
    userName: "",
    password: "",
  });

  /*   const handleChange = (field, val) => {
    setUser({ ...user, [field]: val });
    setErrors({ ...errors, [field]: "" });
  }; */

  const resetField = () => {
    setUserData({ email: "", userName: "", password: "" });
  };

  const submit = () => {
    const emailReges = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newErrors = {};
    if (!userData.email) {
      newErrors.email = "Plase enter a email address";
    } else if (!emailReges.test(userData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!userData.userName) {
      newErrors.userName = "Please enter a username";
    }
    if (!userData.password) {
      newErrors.password = "Please enter a password";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }

    if (
      userData.email &&
      userData.userName &&
      userData.password &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)
    ) {
      createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
            toast.success("Registration done");
            resetField();
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes("auth/email-already-in-use")) {
            setErrors({ email: "email already in use" });
          } else {
            setErrors({ email: "Registration failed. Please try again." });
          }
        });
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center gap-[70px]">
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div>
          <h1 className="font-nun text-[34px] font-bold">
            Get started with easily register
          </h1>
          <p className="text-xl opacity-[0.5] mt-3 font-nun">
            Free register <span className="text-[#808080]">and</span> you can
            enjoy it
          </p>
          <div className="mt-12 flex flex-col">
            <div className="relative select-none">
              <input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                /* onChange={(val) => handleChange("email", val)} */
                onChange={inputChange}
                className={`pl-[52px] text-xl border w-[368px] outline-none border-opacity-30 ${
                  errors.email ? "border-red-500 animate-shake" : "border-dBlue"
                }  py-[22px] focus:border-opacity-80  rounded-lg peer bg-transparent`}
              />
              <label
                htmlFor="email"
                className={`absolute left-[34px] font-nun text-sm opactiy-70 text-dBlue px-[18px] bg-white peer-focus:-top-2 
                ${userData.email ? "-top-2" : "top-6"}
                transition-all duration-300 tracking-[1px]`}
              >
                Email address
              </label>
            </div>
            <p className="text-red-500 mb-8 pl-[52px]">{errors.email}</p>

            <div className="relative select-none">
              <input
                id="userName"
                type="text"
                name="userName"
                value={userData.userName}
                onChange={inputChange}
                className={`pl-[52px] text-xl border w-[368px] outline-none border-opacity-30 ${
                  errors.userName
                    ? "border-red-500 animate-shake"
                    : "border-dBlue"
                } focus:border-opacity-80  py-[22px]  rounded-lg peer bg-transparent`}
              />
              <label
                htmlFor="userName"
                className={`absolute left-[34px] font-nun text-sm opactiy-70 text-dBlue px-[18px] bg-white peer-focus:-top-2 
                  ${userData.userName ? "-top-2" : "top-6"}
                  transition-all duration-300 tracking-[1px]`}
              >
                Username
              </label>
            </div>
            <p className="text-red-500 mb-8 pl-[52px]">{errors.userName}</p>

            <div className="relative select-none">
              <input
                id="password"
                type="password"
                name="password"
                value={userData.password}
                onChange={inputChange}
                className={`pl-[52px] text-xl border w-[368px] outline-none border-opacity-30 ${
                  errors.password
                    ? "border-red-500 animate-shake"
                    : "border-dBlue"
                } focus:border-opacity-80  py-[22px] peer rounded-lg peer bg-transparent`}
              />
              <label
                htmlFor="password"
                className={`absolute left-[34px] font-nun text-sm opactiy-70 text-dBlue px-[18px] bg-white peer-focus:-top-2 
                  ${userData.password ? "-top-2" : "top-6"}
                  transition-all duration-300 tracking-[1px]`}
              >
                Password
              </label>
            </div>
            <p className="text-red-500 mb-8 pl-[52px]">{errors.password}</p>
          </div>
          <button
            onClick={submit}
            className="bg-primary text-white text-xl font-semibold text-center w-[368px] py-5 rounded-full mt-8 focus:bg-opacity-80"
          >
            Sign up
          </button>
          <p className="text-sm w-[368px] text-center font-sans mt-8">
            Already have an account ?{" "}
            <span className="text-[#EA6C00] font-bold cursor-pointer">
              <Link to="/login">Sign in</Link>
            </span>
          </p>
        </div>
        <img
          className="object-cover h-screen w-1/2"
          src="../../../src/assets/Two_Young_Man.png"
        />
      </div>
    </div>
  );
};

export default Registration;
