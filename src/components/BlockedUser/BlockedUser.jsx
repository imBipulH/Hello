import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
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

  return (
    <>
      <div className="py-4">
        <div className="w-[427px]  overflow-hidden  h-[387px] p-5 rounded-b-2xl ml-11 shadow-3xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-pops font-semibold">Blocked User</h1>
            <BiDotsVerticalRounded />
          </div>
          <div className="overflow-y-scroll  h-[300px]">
            {blockList.map((item) => (
              <div
                key={item}
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
                      {item.block}
                    </p>
                    <p className="text-lg font-pops font-semibold">
                      {item.blockBy}
                    </p>
                    <p className="text-lightGray text-sm font-pops font-medium">
                      Hi Guys, what's up.
                    </p>
                  </div>
                  <div>{item.block && <JoinBtn />}</div>
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
