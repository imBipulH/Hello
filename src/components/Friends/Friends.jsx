import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
} from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/* const JoinBtn = () => {
  return (
    <>
      <button className="px-[22px] h-[30px] bg-primary text-white text-xl font-semibold rounded-md">
        Block
      </button>
    </>
  );
}; */

/* const ListItem = () => {
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
}; */

const Friends = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const friendRef = ref(db, "friend/");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().receiverid === data.uid ||
          item.val().senderid === data.uid
        ) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setFriends(arr);
    });
  }, []);
  console.log(friends);

  //Block Button

  const handleBlock = (item) => {
    const db = getDatabase();
    if (data.uid === item.senderid) {
      set(
        push(ref(db, "block/"), {
          blockName: item.receivername,
          blockId: item.receiverid,
          blockBy: item.sendername,
          blockById: item.senderid,
        }).then(() => {
          remove(ref(db, "friend/" + item.key));
        })
      );
    } else {
      set(
        push(ref(db, "block/"), {
          blockName: item.sendername,
          blockId: item.senderid,
          blockBy: item.receivername,
          blockById: item.receiverid,
        }).then(() => {
          remove(ref(db, "friend/" + item.key));
        })
      );
    }
  };

  return (
    <>
      <div className="h-full">
        <div className="w-fulls overflow-hidden  p-5 rounded-b-2xl  shadow-3xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-pops font-semibold">Friends</h1>
            <BiDotsVerticalRounded />
          </div>
          <div className="overflow-y-scroll h-[200px]">
            {friends.map((item) => {
              return (
                <div
                  key={item}
                  className="flex gap-4 items-center border-b py-[10px] first: my-3  "
                >
                  <img
                    src={item.senderphoto}
                    alt="name"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="flex w-full justify-between items-center">
                    <div className="">
                      <p className="text-lg font-pops font-semibold">
                        {item.receiverid === data.uid
                          ? item.sendername
                          : item.receivername}
                      </p>
                      <p className="text-lightGray text-sm font-pops font-medium"></p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleBlock(item)}
                        className="px-[22px] h-[30px] bg-primary text-white text-xl font-semibold rounded-md"
                      >
                        Block
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
