import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux/es/hooks/useSelector";

const JoinBtn = () => {
  return (
    <>
      <button className="px-[22px] h-[30px] bg-primary text-white text-xl font-semibold rounded-md">
        Unblock
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

const BlockedUser = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    const blockRef = ref(db, "block/");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().blockById == data.uid) {
          arr.push({
            block: item.val().blockName,
            blockId: item.val().blockId,
          });
        } else {
          arr.push({
            blockBy: item.val().blockBy,
            blockById: item.val().blockById,
          });
        }
        setBlockList(arr);
      });
    });
  }, []);

  const handleUnblock = (item) => {
    console.log(item);
    const db = getDatabase();
    set(
      push(ref(db, "friend/"), {
        sendername: data.displayName,
        senderemail: data.email,
        senderid: data.uid,
        receivername: item.block,
        receiverid: item.blockId,
      }).then(() => {
        remove(ref(db, "block/", item.blockId)).then(() => {
          setBlockList((prevBlockList) => {
            prevBlockList.filter((blockItem) => {
              blockItem.blockId !== item.blockId;
            });
          });
        });
      }),
    );
  };

  return (
    <>
      <div className="py-4">
        <div className="w-full overflow-hidden p-5 rounded-b-2xl shadow-3xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-pops font-semibold">Blocked User</h1>
            <BiDotsVerticalRounded />
          </div>
          <div className="flex items-center justify-between rounded-lg shadow-3xl mb-2 py-2 px-5">
            <input
              type="text"
              className="w-full px-2 outline-none"
              placeholder="Search"
            />
            <FiSearch className="text-xl select-none" />
          </div>
          <div className="overflow-y-scroll  h-[220px]">
            {blockList &&
              blockList.map((item) => (
                <div
                  key={item.blockId}
                  className="flex gap-4 items-center border-b py-[10px] first: my-3  "
                >
                  <img
                    src="../../../src/assets/profile_img.jpg"
                    alt="name"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="flex w-full justify-between items-center">
                    <div className="">
                      <p className="text-lg font-pops font-semibold">
                        {item.block}
                      </p>
                      <p className="text-lg font-pops font-semibold">
                        {item.blockBy}
                      </p>
                      <p className="text-lightGray text-sm font-pops font-medium">
                        Hi Guys, what's up.
                      </p>
                    </div>
                    <div onClick={() => handleUnblock(item)}>
                      {item.block && (
                        <JoinBtn
                          onClick={() => console.log("unblcok clicked")}
                        />
                      )}
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

export default BlockedUser;
