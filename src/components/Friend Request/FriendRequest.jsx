import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const JoinBtn = ({ onCancel }) => {
  return (
    <>
      <button
        onClick={onCancel}
        className="px-[22px] h-[30px] bg-primary text-white text-xl font-semibold rounded-md"
      >
        Cancel
      </button>
    </>
  );
};

const FriendRquest = () => {
  const db = getDatabase();
  const [sentRequest, setSentRequest] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "friendrequest/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), requestId: item.key });
      });
      setSentRequest(arr);
    });
  }, [db]);

  const handleCancelRequest = (requestId) => {
    const requestRef = ref(db, `friendrequest/${requestId}`);
    remove(requestRef);
    console.log(requestRef, "cancelled");
  };

  return (
    <>
      <div className="py-4">
        <div className="w-[427px]  overflow-hidden  h-[387px] p-5 rounded-b-2xl ml-11 shadow-3xl">
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
                  className="w-[70px] h-[70px] rounded-full"
                />
                <div className="flex w-full justify-between items-center">
                  <div className="">
                    <p className="text-lg font-pops font-semibold">
                      {item.receivername}
                    </p>
                    <p className="text-lightGray text-sm font-pops font-medium">
                      {item.receiveremail}
                    </p>
                  </div>
                  <div>
                    <JoinBtn
                      onClick={console.log("clicked cancel button")}
                      onCancel={() => handleCancelRequest(item.requestId)}
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
