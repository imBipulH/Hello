import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const JoinBtn = () => {
  return (
    <>
      <button className="px-[22px] h-[30px] bg-primary text-white text-xl font-semibold rounded-md">
        +
      </button>
    </>
  );
};

const UserList = () => {
  const db = getDatabase();
  const [userLists, setUserLists] = useState([]);
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid != item.key) {
          arr.push(item.val());
        }
      });
      setUserLists(arr);
    });
  }, []);
  return (
    <>
      <div className="py-4">
        <div className="w-[427px]  overflow-hidden  h-[451px] p-5 rounded-b-2xl ml-11 shadow-3xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-pops font-semibold">User List</h1>
            <BiDotsVerticalRounded />
          </div>
          <div className="overflow-y-scroll  h-[300px]">
            {userLists.map((item) => (
              <div
                className="flex gap-4 items-center border-b py-[10px] first: my-3 "
                key={item}
              >
                <img
                  src="../../../src/assets/profile_img.jpg"
                  alt="name"
                  className="w-[70px] h-[70px] rounded-full"
                />
                <div className="flex w-full justify-between items-center">
                  <div className="">
                    <p className="text-lg font-pops font-semibold">
                      {item.username}
                    </p>
                    <p className="text-lightGray text-sm font-pops font-medium">
                      {item.email}
                    </p>
                  </div>
                  <div>
                    <JoinBtn />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
