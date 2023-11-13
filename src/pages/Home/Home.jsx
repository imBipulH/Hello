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
        <div>
          <div className="flex">
            <Sidebar />
            <div className="flex flex-col">
              <GroupList />
              <FriendRquest />
            </div>
            <div className="flex flex-col">
              <Friends />
              <MyGroups />
            </div>
            <div className="flex flex-col">
              <UserList />
              <BlockedUser />
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
