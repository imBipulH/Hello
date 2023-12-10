// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import GroupList from "../../components/GroupList/GroupList";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from "../../slices/userSlice";
import FriendRquest from "../../components/Friend Request/FriendRequest";
import Friends from "../../components/Friends/Friends";
import MyGroups from "../../components/My Groups/MyGroups";
import UserList from "../../components/UserList/UserList";
import BlockedUser from "../../components/BlockedUser/BlockedUser";

const Home = () => {
  const auth = getAuth();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [verify, setVerify] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerify(true);
      dispatch(userLoginInfo(user));
      localStorage.setItem("userLoginInfo", JSON.stringify(user));
    }
  });

  return (
    <>
      {verify ? (
        <div className="max-w-[1320px] m-auto ">
          <div className="flex">
            <Sidebar active="Home" />
            <div className="w-[1180px] flex flex-col gap-3 items-between justify-between m-auto">
              <div className="flex h-1/2 gap-2 items-center mb-0 justify-between">
                <div className="w-1/3">
                  <GroupList />
                </div>
                <div className="w-1/3">
                  <Friends />
                </div>
                <div className="w-1/3">
                  <UserList />
                </div>
              </div>
              <div className="flex h-1/2 gap-2 justify-between">
                <div className="w-1/3">
                  <FriendRquest />
                </div>
                <div className="w-1/3">
                  <MyGroups />
                </div>
                <div className="w-1/3">
                  <BlockedUser />
                </div>
              </div>
            </div>
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
