// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import GroupList from "../../components/GroupList/GroupList";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const auth = getAuth();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [verify, setVerify] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified === true) {
      setVerify(true);
    }
  });

  return (
    <>
      {verify ? (
        <div>
          <div className="flex">
            <Sidebar />
            <GroupList />
            <div>Com 3</div>
            <div>Com 4</div>
          </div>
        </div>
      ) : (
        <div className="bg-primary w-screen h-screen flex items-center justify-center">
          <div className="bg-white text-primary p-12 rounded-xl">
            <h1 className="text-nun font-bold text-5xl">
              {" "}
              Please verify email first!{" "}
            </h1>
            <Link to="/login">
              <button className="mt-4">Back to login</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
