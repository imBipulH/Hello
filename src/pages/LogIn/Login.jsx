import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// eslint-disable-next-line react/prop-types
const LoginField = ({ type, name, label, handle, icon, icon2 }) => {
  const [userData, setUserData] = useState("");
  const [show, setShow] = useState(false);

  const closeEye = () => {
    setShow(true);
  };

  const openEye = () => {
    setShow(false);
  };

  console.log(show);

  const InputChange2 = (event) => {
    setUserData(event.target.value);
    if (handle) {
      handle(event.target.value);
    }
  };

  return (
    <>
      <div className="cursor-auto select-none relative border-b border-dBlue border-opacity-30">
        <input
          className="border-bottom bg-transparent text-xl font-sans font-semibold text-dBlue py-2 mt-11 outline-none w-full peer"
          onChange={InputChange2}
          type={show ? "text" : type}
          name={name}
          id={name}
        />
        <label
          htmlFor={name}
          className={`cursor-pointer absolute text-dBlue opacity-50 font-sans left-0 ${
            userData ? "top-6 text-xs" : "top-14"
          } text-sm peer-focus:top-6 transiton-all duration-300 -z-10 tracking-widest`}
        >
          {label}
        </label>
        <div
          onClick={!show ? closeEye : openEye}
          className="absolute cursor-pointer opacity-80 top-14 text-2xl right-0"
        >
          {show ? icon : icon2}
        </div>
      </div>
    </>
  );
};

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    let emailReges = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newError = {};
    if (!user.email) {
      newError.email = "Please enter an email address";
    } else if (!emailReges.test(user.email)) {
      newError.email = "Please enter a valid email address";
    }
    if (!user.password) {
      newError.password = "Please enter a password";
    }
    if (Object.keys(newError.length > 0)) {
      setErrors(newError);
      return;
    }
  };

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <div>
      <div className="flex justify-end items-center">
        <div>
          <h1 className="font-sans text-[34px] font-bold text-dBlue">
            Login to your account!
          </h1>
          <div className="inline-block cursor-pointer border rounded-[8px] mb-2 mt-7 py-5 px-10 border-dBlue border-opacity-30">
            <div className="flex cursor-pointer gap-2 items-center justify-center">
              <img
                className="w-5 h-5"
                src="../../../src/assets/G_Icon.png"
                alt="Google"
              />
              <p className="text-sm">Login with Google</p>
            </div>
          </div>
          <div>
            <LoginField
              type="email"
              name="email"
              label="Email Addres"
              handle={(value) => handleChange("email", value)}
            />{" "}
            {errors.email && (
              <p className="text-white text-center py-1 rounded bg-red-500 mt-1 ">
                {errors.email}
              </p>
            )}
            <LoginField
              type="password"
              name="password"
              label="Password"
              handle={(value) => handleChange("password", value)}
              icon={<AiOutlineEye />}
              icon2={<AiOutlineEyeInvisible />}
            />
            {errors.password && (
              <p className="text-white text-center py-1 rounded bg-red-500 mt-1 ">
                {errors.password}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="py-6 mt-14 scale-110 rounded-lg font-semibold text-xl font-sans px-[122px] bg-primary text-white"
          >
            Login to Continue
          </button>

          <p className="font-sans mt-9  text-sm">
            Don’t have an account ?{" "}
            <span className="font-bold cursor-pointer text-[#EA6C00]">
              <Link to="/registration">Sign up</Link>
            </span>
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

export default Login;
