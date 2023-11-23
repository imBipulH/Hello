import {
  getDatabase,
  onValue,
  ref,
  set,
  remove,
  push,
} from "firebase/database";
import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const JoinBtn = ({ onCancel, btnName }) => {
  return (
    <>
      <button
        onClick={onCancel}
        className="px-[22px] h-[30px] bg-primary text-white text-xl font-semibold rounded-md"
      >
        {btnName}
      </button>
    </>
  );
};

const FriendRquest = () => {
  const db = getDatabase();
  const [sentRequest, setSentRequest] = useState([]);
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    const userRef = ref(db, "friendrequest/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverid === data.uid) {
          arr.push({ ...item.val(), requestId: item.key });
        }
      });
      setSentRequest(arr);
    });
  }, []);

  const handleAccept = (item) => {
    set(push(ref(db, "friend/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendrequest/"));
    });
  };

  const handleCancelRequest = (requestId) => {
    const requestRef = ref(db, `friendrequest/${requestId}`);
    remove(requestRef);
    console.log(requestRef, "cancelled");
  };

  return (
    <>
      <div className="py-4">
        <div className="w-full overflow-hidden p-5 rounded-b-2xl shadow-3xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-pops font-semibold">Friend Request</h1>
            <BiDotsVerticalRounded />
          </div>
          <div className="overflow-y-scroll  h-[300px]">
            {sentRequest.map((item) => (
              <div
                key={item}
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
                      {item.sendername}
                    </p>
                    <p className="text-lightGray text-sm font-pops font-medium">
                      {item.senderemail}
                    </p>
                  </div>
                  <div>
                    <JoinBtn
                      btnName="Cancel"
                      onCancel={() => handleCancelRequest(item.requestId)}
                    />
                    <JoinBtn
                      btnName="Accept"
                      onCancel={() => handleAccept(item)}
                    />
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

export default FriendRquest;
