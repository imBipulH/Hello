import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Registration from "./pages/registration/Registration.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/LogIn/Login.jsx";
import firebaseConfig from "./authentication/firebaseConfig";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
