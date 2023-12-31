import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux/es/hooks/useSelector";

const JoinBtn = () => {
  return (
    <>
      <button className="px-[22px] h-[30px] bg-primary text-white text-xl font-semibold rounded-md">
        Join
      </button>
    </>
  );
};

const MyGroups = () => {
  const [group, setGroup] = useState([]);
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "group/");

    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid == data.uid) {
          arr.push(item.val());
        }
      });
      setGroup(arr);
    });
  }, []);

  return (
    <>
      <div className="py-0">
        <div className="w-full  overflow-hidden p-5 rounded-b-2xl shadow-3xl">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-pops font-semibold">My Groups</h1>
            <BiDotsVerticalRounded />
          </div>
          <div className="flex items-center justify-between rounded-lg shadow-3xl mb-4 py-2 px-5">
            <input
              type="text"
              className="w-full px-2 outline-none"
              placeholder="Search"
            />
            <FiSearch className="text-xl select-none" />
          </div>
          <div className="overflow-y-scroll  h-[200px]">
            {group.map((item) => (
              <div key={item} className="flex gap-4 items-center mb-4">
                <img
                  src="../../../src/assets/profile_img.jpg"
                  alt="name"
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="flex w-full justify-between items-center">
                  <div className="">
                    <p className="text-lg font-pops font-semibold">
                      {item.groupname}
                    </p>
                    <p className="text-lightGray text-sm font-pops font-medium">
                      {item.grouptag}
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

export default MyGroups;
