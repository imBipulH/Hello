import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Registration from "./pages/registration/Registration.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/LogIn/Login.jsx";
import firebaseConfig from "./authentication/firebaseConfig";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import store from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ForgetPassword",
    element: <ForgetPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
