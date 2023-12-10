import ModalImage from "react-modal-image";
import { MdEmojiEmotions } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect } from "react";

const Chatbox = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const activeData = useSelector((state) => state.activeChat.active);
  console.log(activeData);
  console.log(activeData.id);
  const [msg, setMsg] = useState("");
  const [singleMsg, setSingleMsg] = useState([]);

  const handleMsg = () => {
    if (activeData.status == "single") {
      set(push(ref(db, "singleMsg")), {
        msg: msg,
        msgSenderId: data.uid,
        msgSenderName: data.displayName,
        msgReceiverId: activeData.id,
        msgReceiverName: activeData.name,
      });
    } else {
      console.log("This is group message");
    }
  };

  useEffect(() => {
    const singleMsgRef = ref(db, "singleMsg/");
    onValue(singleMsgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().msgSenderId == data.uid &&
            item.val().msgReceiverId == activeData.id) ||
          (item.val().msgReceiverId == data.uid &&
            item.val().msgSenderId == activeData.id)
        ) {
          arr.push(item.val());
        }
      });
      setSingleMsg(arr);
    });
  }, []);

  return (
    <>
      <div className="p-5 mt-2 w-full">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full"
            src="../../../src/assets/profile_img.jpg"
            alt="profile"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-pops font-semibold">
              {activeData.name}
            </h1>
            <p>online</p>
          </div>
        </div>
        <div>
          <div className="bg-gray-200 w-full h-[500px] p-4 mt-4 overflow-y-scroll">
            {singleMsg.map((item) =>
              item.msgSenderId == data.uid ? (
                <div key={item} className="flex justify-end">
                  <div className="mt-4 max-w-[500px]">
                    <p className="bg-primary max-w-[500px] text-white mr-4 px-8 py-4 inline-block rounded-md  relative before:content-[''] before:border-[18px] before:border-transparent before:absolute before:w-0 before:h-0 before:border-b-primary before:rounded-md before:bottom-0 before:right-[-15px]  */">
                      {item.msg}
                    </p>
                    <p className="text-gray-700 mt-1 mr-4 text-right text-sm">
                      Today, 2:02pm
                    </p>
                  </div>
                </div>
              ) : (
                <div key={item} className=" mt-4 max-w-[500px]">
                  <p className="bg-white ml-4 px-8 py-4 inline-block rounded-md  relative before:content-[''] before:border-[18px] before:border-transparent before:absolute before:w-0 before:h-0 before:border-b-white before:rounded-md before:bottom-0 before:left-[-15px]  */">
                    {item.msg}
                  </p>
                  <p className="text-gray-700 mt-2 ml-4 text-sm">
                    Today, 2:02pm
                  </p>
                </div>
              )
            )}

            {/*      {/* Receiver Msg */}

            {/* Receiver Msg Start */}
            {/*         <div className="mt-2 max-w-[500px]">
              <p className="bg-white ml-4 px-8 py-4 inline-block rounded-md  relative before:content-[''] before:border-[18px] before:border-transparent before:absolute before:w-0 before:h-0 before:border-b-white before:rounded-md before:bottom-0 before:left-[-15px]">
                How are you!
              </p>
              <p className="text-gray-700 mt-2 ml-4 text-sm">Today, 2:02pm</p>
            </div> */}
            {/* Receiver Msg End */}

            {/* Receiver Msg Start */}
            {/*            <div className="mt-6">
              <div className=" bg-white ml-4 px-4 py-4 inline-block rounded-md  relative before:content-[''] before:border-[18px] before:border-transparent before:absolute before:w-0 before:h-0 before:border-b-white before:rounded-md before:bottom-0 before:left-[-15px]">
                <ModalImage
                  small="../../../src/assets/Girl_Browsing_Phone.png"
                  large="../../../src/assets/Girl_Browsing_Phone.png"
                  alt="Sender Name"
                  className="w-60"
                />
              </div>{" "}
              <p className="text-gray-700 mt-2 ml-4 text-sm">Today, 2:02pm</p>
            </div> */}
            {/* Receiver Msg End */}

            {/* Sender Msg Start */}
            {/*             <div className="flex justify-end">
              <div className="mt-6">
                <div className=" bg-primary ml-4 px-4 py-4 inline-block rounded-md  relative before:content-[''] before:border-[18px] before:border-transparent before:absolute before:w-0 before:h-0 before:border-b-primary before:rounded-md before:bottom-0 before:right-[-15px]">
                  <ModalImage
                    small="../../../src/assets/Girl_Browsing_Phone.png"
                    large="../../../src/assets/Girl_Browsing_Phone.png"
                    className="w-60"
                  />
                </div>
                <p className="text-gray-700 mt-1 mr-4 text-right text-sm">
                  Today, 2:02pm
                </p>
              </div>
            </div> */}
            {/* Sender Msg End */}

            {/* Sender Msg Start */}

            {/* Sender Msg End */}

            {/* Sender Msg Start */}

            {/* Sender Msg End */}
          </div>
        </div>
        <div className="flex mt-5 gap-2 justify-between items-center select-none">
          <div className="flex items-center select-none justify center w-full border border-gray-600 rounded-lg py-1 px-4">
            <input
              onChange={(e) => setMsg(e.target.value)}
              type="text"
              className="w-full select-text font-pops text-black focus:outline-none  "
              placeholder="Type a message..."
            />
            <MdEmojiEmotions className="text-3xl text-gray-600" />
            <FaImage className="text-2xl text-gray-600 ml-4" />
          </div>

          <button
            onClick={handleMsg}
            className="bg-primary text-white px-3 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};
export default Chatbox;
