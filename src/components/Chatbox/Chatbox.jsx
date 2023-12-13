import ModalImage from "react-modal-image";
import { MdEmojiEmotions } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState, useRef } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from "moment";
import { useLayoutEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  getDownloadURL,
  getStorage,
  ref as sref,
  uploadBytes,
} from "firebase/storage";

const Chatbox = () => {
  const messageContainerRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const activeData = useSelector((state) => state.activeChat.active);
  const [msg, setMsg] = useState("");
  const [singleMsg, setSingleMsg] = useState([]);
  const [show, setShow] = useState(false);

  const handleMsg = () => {
    if (activeData.status == "single" && msg.length > 0) {
      set(push(ref(db, "singleMsg")), {
        msg: msg,
        msgSenderId: data.uid,
        msgSenderName: data.displayName,
        msgSenderPhoto: data.photoURL,
        msgReceiverId: activeData.id,
        msgReceiverName: activeData.name,
        msgReceiverPhoto: activeData.dp,
        date: `${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
      }).then(() => {
        setMsg("");
      });
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    } else {
      console.log("This is group message");
    }
  };

  const handleEmoji = (emoji) => {
    setMsg((prevMsg) => prevMsg + emoji.emoji);
  };

  const closeEmojiPicker = (e) => {
    if (
      show &&
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(e.target)
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeEmojiPicker);
    return () => {
      document.removeEventListener("click", closeEmojiPicker);
    };
  }, []);

  const handleEnterKey = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleMsg();
    }
  };

  const sendImg = (e) => {
    const storage = getStorage();
    const storageRef = sref(storage, "some-child");
    const file = e.target.files[0];

    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "singleMsg")), {
          img: downloadURL,
          msgSenderId: data.uid,
          msgSenderName: data.displayName,
          msgSenderPhoto: data.photoURL,
          msgReceiverId: activeData.id,
          msgReceiverName: activeData.name,

          date: `${new Date().getFullYear()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setMsg("");
        });
      });
    });
  };

  useEffect(() => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [singleMsg]);

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

  useLayoutEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [singleMsg]);

  return (
    <>
      <div className="p-5 mt-2 w-full h-screen flex flex-col relative">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full"
            src={activeData.dp}
            alt="profile"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-pops font-semibold">
              {activeData.name}
            </h1>
            <div className="flex items-center justify-start gap-2">
              {activeData && (
                <p className="w-2 h-2 rounded-full bg-green-500"></p>
              )}
              <p>Online</p>
            </div>
          </div>
        </div>
        <div>
          <div
            className="bg-gray-200 h-[500px] overflow-y-scroll p-5 my-4 grow"
            ref={messageContainerRef}
          >
            {singleMsg.map((item, index) =>
              item.msgSenderId == data.uid ? (
                item.img ? (
                  <div key={index} className="flex justify-end">
                    <div className="mt-6">
                      <div className="flex items-end justify-end gap-4 ">
                        <div className=" bg-primary ml-4 px-4 py-4 inline-block rounded-md  relative before:content-[''] before:border-[18px] before:border-transparent before:absolute before:w-0 before:h-0 before:border-b-primary before:rounded-md before:bottom-0 before:right-[-15px]">
                          <ModalImage
                            small={item.img}
                            large={item.img}
                            className="w-60"
                          />
                        </div>
                        <img
                          src={item.msgSenderPhoto}
                          alt="DP"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                      <p className="text-gray-700 mt-1 mr-12 text-right text-sm">
                        {moment(item.date, "YYYYYMMDD HH:mm").fromNow()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex justify-end">
                    <div className="mt-4 max-w-[500px]">
                      <div className="flex justify-start items-end gap-2 ">
                        <p className="bg-primary max-w-[500px] text-white mr-4 px-8 py-4 inline-block rounded-md  relative before:content-[''] before:border-[18px] before:border-transparent before:absolute before:w-0 before:h-0 before:border-b-primary before:rounded-md before:bottom-0 before:right-[-15px]  */">
                          {item.msg}
                        </p>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={item.msgSenderPhoto}
                          alt="DP"
                        />
                      </div>
                      <p className="text-gray-700 mt-1 mr-12 text-right text-sm">
                        {moment(item.date, "YYYYYMMDD hh:mm").fromNow()}
                      </p>
                    </div>
                  </div>
                )
              ) : item.img ? (
                <div key={index} className="mt-6">
                  <div className="flex justify-start items-end gap-2">
                    <img
                      src={item.msgSenderPhoto}
                      alt="DP"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className=" bg-white ml-4 px-4 py-4 inline-block rounded-md  relative before:content-[''] before:border-[18px] before:border-transparent before:absolute before:w-0 before:h-0 before:border-b-white before:rounded-md before:bottom-0 before:left-[-15px]">
                      <ModalImage
                        small={item.img}
                        large={item.img}
                        alt="Sender Name"
                        className="w-60"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2 ml-12 text-sm">
                    {moment(item.date, "YYYYYMMDD HH:mm").fromNow()}
                  </p>
                </div>
              ) : (
                <div key={index} className=" mt-4 max-w-[500px]">
                  <div className="flex justify-start items-end gap-2">
                    <img
                      src={item.msgSenderPhoto}
                      alt="DP"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="bg-white ml-4 px-8 py-4 inline-block rounded-md  relative before:content-[''] before:border-[18px] before:border-transparent before:absolute before:w-0 before:h-0 before:border-b-white before:rounded-md before:bottom-0 before:left-[-15px]  */">
                      {item.msg}
                    </p>
                  </div>
                  <p className="text-gray-700 mt-2 ml-12 text-sm">
                    {moment(item.date, "YYYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
        {show && (
          <div className="absolute top-[120px] right-[300px]">
            <div ref={emojiPickerRef}>
              <EmojiPicker onEmojiClick={(emoji) => handleEmoji(emoji)} />
            </div>
          </div>
        )}
        <div className="flex mt-5 gap-2 justify-between items-center select-none">
          <div className="flex items-center select-none justify center w-full border border-gray-600 rounded-lg py-1 px-4">
            <input
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={handleEnterKey}
              type="text"
              value={msg}
              className="w-full select-text font-pops text-black focus:outline-none  "
              placeholder="Type a message..."
            />

            <MdEmojiEmotions
              onClick={() => setShow(!show)}
              className="cursor-pointer text-3xl text-gray-600"
            />
            <label className="cursor-pointer">
              <input onChange={sendImg} type="file" className="hidden" />
              <FaImage className="text-2xl text-gray-600 ml-4" />
            </label>
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
