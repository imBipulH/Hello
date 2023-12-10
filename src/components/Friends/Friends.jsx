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
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { activeChat } from "../../slices/activeChatSlice";

const Friends = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
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

  //Block Button

  const handleBlock = (item) => {
    const db = getDatabase();
    if (data.uid === item.senderid) {
      set(
        push(ref(db, "block/"), {
          blockName: item.receivername,
          blockId: item.receiverid,
          blockPhoto: item.receiverphoto,
          blockBy: item.sendername,
          blockById: item.senderid,
          blockByPhoto: item.senderphoto,
        }).then(() => {
          remove(ref(db, "friend/" + item.key));
        })
      );
    } else {
      set(
        push(ref(db, "block/"), {
          blockName: item.sendername,
          blockId: item.senderid,
          blockPhoto: item.senderphoto,
          blockBy: item.receivername,
          blockById: item.receiverid,
          blockByPhoto: item.receiverphoto,
        }).then(() => {
          remove(ref(db, "friend/" + item.key));
        })
      );
    }
  };

  const handleMsgData = (item) => {
    if (data.uid == item.receiverid) {
      dispatch(
        activeChat({
          status: 'single',
          name: item.sendername,
          id: item.senderid,
        })
      );
    } else {
      dispatch(
        activeChat({
          status: 'single',
          name: item.receivername,
          id: item.receiverid,
        })
      );
    }
  };

  return (
    <>
      <div className="h-full">
        <div className="w-full overflow-hidden px-5 py-3 rounded-b-2xl shadow-3xl">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-pops font-semibold">Friends</h1>
            <BiDotsVerticalRounded />
          </div>
          <div className="flex items-center justify-between rounded-lg shadow-3xl mb-2 py-2 px-4">
            <input
              type="text"
              className="w-full px-2 outline-none"
              placeholder="Search"
            />
            <FiSearch className="text-xl select-none" />
          </div>
          <div className="overflow-y-scroll h-[200px]">
            {friends.map((item) => {
              return (
                <div
                  key={item}
                  className="flex gap-4 items-center border-b py-[10px]"
                >
                  <img
                    src={
                      data.uid == item.senderid
                        ? item.receiverphoto
                        : item.senderphoto
                    }
                    alt="name"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <div className="flex w-full justify-between items-center">
                    <div onClick={() => handleMsgData(item)} className="">
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
