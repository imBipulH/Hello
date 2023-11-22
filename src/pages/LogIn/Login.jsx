import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../slices/userSlice";

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
  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errMessege, setErrMessege] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

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
    if (Object.keys(newError).length > 0) {
      setErrors(newError);
      return;
    }
    if (user.email && user.password && emailReges.test(user.email)) {
      setLoading(true);
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((user) => {
          dispatch(userLoginInfo(user.user));
          localStorage.setItem(
            "userLoginInfo",
            JSON.stringify(userLoginInfo(user.user))
          );
          setLoading(false);
          toast.success("Login successful");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          console.log("successfully logged in");
          setErrMessege("");
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes("auth/invalid-login-credentials")) {
            setErrMessege(
              "The user's email address or password is incorrect. Please try again."
            );
          }
        });
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
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <h1 className="font-sans text-[34px] font-bold text-dBlue">
            Login to your account!
          </h1>
          <div
            onClick={googleLogin}
            className="inline-block cursor-pointer border rounded-[8px] mb-2 mt-7 py-5 px-10 border-dBlue border-opacity-30"
          >
            <div
              onClick={googleLogin}
              className="flex cursor-pointer gap-2 items-center justify-center"
            >
              <img
                className="w-5 h-5"
                src="../../../src/assets/G_Icon.png"
                alt="Google"
              />
              <p className="text-sm">Login with Google</p>
            </div>
          </div>
          {errMessege ? (
            <p className="bg-red-500 text-white p-2 rounded">{errMessege}</p>
          ) : null}
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
          {loading ? (
            <div className="flex justify-center items-center py-6">
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
              className="py-6 mt-14 scale-110 rounded-lg font-semibold text-xl font-sans px-[122px] bg-primary text-white"
            >
              Login to Continue
            </button>
          )}

          <p className="font-sans mt-9  text-sm">
            Don’t have an account ?{" "}
            <span className="font-bold cursor-pointer text-[#EA6C00]">
              <Link to="/registration">Sign up</Link>
            </span>
          </p>
          <p className="font-bold cursor-pointer text-[#EA6C00]">
            <Link to="/ForgetPassword">Forget Password</Link>
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
