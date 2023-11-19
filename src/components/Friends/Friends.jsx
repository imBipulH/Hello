import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

const JoinBtn = () => {
  return (
    <>
      <button className="px-[22px] h-[30px] bg-primary text-white text-xl font-semibold rounded-md">
        Join
      </button>
    </>
  );
};

const ListItem = () => {
  return (
    <>
      <div className="flex gap-4 items-center border-b py-[10px] first: my-3  ">
        <img
          src="../../../src/assets/profile_img.jpg"
          alt="name"
          className="w-[70px] h-[70px] rounded-full"
        />
        <div className="flex w-full justify-between items-center">
          <div className="">
            <p className="text-lg font-pops font-semibold">Bipul Hajong</p>
            <p className="text-lightGray text-sm font-pops font-medium">
              Hi Guys, what's up.
            </p>
          </div>
          <div>
            <JoinBtn />
          </div>
        </div>
      </div>
    </>
  );
};

const Friends = () => {
  const db = getDatabase();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const friendRef = ref(db, "friend/");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setFriends(arr);
    });
  }, []);
  console.log(friends);

  return (
    <>
      <div className="py-4">
        <div className="w-[427px]  overflow-hidden  h-[451px] p-5 rounded-b-2xl ml-11 shadow-3xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-pops font-semibold">Friends</h1>
            <BiDotsVerticalRounded />
          </div>
          <div className="overflow-y-scroll  h-[300px]">
            {friends.map((item) => {
              <div
                key={item.id}
                className="flex gap-4 items-center border-b py-[10px] first: my-3  "
              >
                <img
                  src="../../../src/assets/profile_img.jpg"
                  alt="name"
                  className="w-[70px] h-[70px] rounded-full"
                />
                <div className="flex w-full justify-between items-center">
                  <div className="">
                    <p className="text-lg font-pops font-semibold">
                      {item.sendername}
                    </p>
                    <p className="text-lightGray text-sm font-pops font-medium">
                      {item.senderemail}
                    </p>
                  </div>
                  <div>
                    <JoinBtn />
                  </div>
                </div>
              </div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
