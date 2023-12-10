import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";

// eslint-disable-next-line react/prop-types
const JoinBtn = () => {
  return (
    <>
      <button className="px-4 h-[30px] bg-primary text-white text-sm font-semibold rounded-md">
        Add
      </button>
    </>
  );
};

const UserList = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  console.log(data);
  const db = getDatabase();
  const [userLists, setUserLists] = useState([]);
  const [sentRequestLists, setSentRequestLists] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendList, setFriendList] = useState([]);

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid != item.key) {
          arr.push({ ...item.val(), userid: item.key });
        }
      });
      setUserLists(arr);
    });
  }, []);

  useEffect(() => {
    const friendRef = ref(db, "friend/");
    let arr = [];
    onValue(friendRef, (snapshot) => {
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid);
      });
      setFriendList(arr);
    });
  }, []);

  useEffect(() => {
    const friendRequestRef = ref(db, "friendrequest/");
    let arr = [];
    onValue(friendRequestRef, (snapshot) => {
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid);
      });
      setFriendRequestList(arr);
    });
  }, []);

  const handleFriendRequest = (item) => {
    //check friendrequest sent or not
    const userRef = ref(db, "friendrequest/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setSentRequestLists(arr);
    });
    if (
      sentRequestLists.some(
        (request) =>
          request.senderid === data.uid && request.receiverid === item.userid,
      )
    ) {
      console.log("already sent request", item);
    } else {
      console.log("just now sending", item);
      setRequestSent(true);
      set(push(ref(db, "friendrequest/")), {
        sendername: data.displayName,
        senderemail: data.email,
        senderid: data.uid,
        senderphoto: data.photoURL,
        /*  receiverphoto: item.photoURL, */
        receivername: item.username,
        receiverid: item.userid,
        receiveremail: item.email,
      });
    }
  };

  const handleSearch = (e) => {
    let searchlist = [];
    if (e.target.value.length == 0) {
      setSearchData([]);
    } else {
      userLists.map((item) => {
        if (
          item.username.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          searchlist.push(item);
          setSearchData(searchlist);
        }
      });
    }
  };

  return (
    <>
      <div className="py-4">
        <div className="w-full  overflow-hidden p-5 rounded-b-2xl shadow-3xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-pops font-semibold">User List</h1>
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
          <div className="overflow-y-scroll h-[220px]">
            {searchData.length > 0
              ? searchData.map((item) => (
                <div
                  className="flex gap-4 items-center border-b py-[10px] first: my-3 "
                  key={item}
                >
                  <img
                    src={item.dp}
                    alt="name"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="flex w-full justify-between items-center">
                    <div className="">
                      <p className="text-md font-pops font-semibold">
                        {item.username}
                      </p>
                      <p className="text-lightGray text-sm font-pops font-medium">
                        {item.email}
                      </p>
                    </div>
                    {friendList.includes(item.userid + data.uid) ||
                      friendList.includes(data.uid + item.userid) ? (
                      <button className="px-[22px] h-[30px] bg-primary text-white text-sm font-semibold rounded-md">
                        Friend
                      </button>
                    ) : friendRequestList.includes(item.userid + data.uid) ||
                      friendRequestList.includes(data.uid + item.userid) ? (
                      <>
                        <button className="px-3 py-2 bg-primary text-white text-sm font-semibold rounded-md">
                          Pending
                        </button>
                      </>
                    ) : (
                      <div onClick={() => handleFriendRequest(item)}>
                        <JoinBtn requestSent={requestSent} />
                      </div>
                    )}
                  </div>
                </div>
              ))
              : userLists.map((item) => (
                <div
                  className="flex gap-4 items-center border-b py-[10px] first: my-3 "
                  key={item}
                >
                  <img
                    src={item.dp}
                    alt="name"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="flex w-full justify-between items-center">
                    <div className="">
                      <p className="text-md font-pops font-semibold">
                        {item.username}
                      </p>
                      <p className="text-lightGray text-sm font-pops font-medium">
                        {item.email}
                      </p>
                    </div>
                    {friendList.includes(item.userid + data.uid) ||
                      friendList.includes(data.uid + item.userid) ? (
                      <button className="px-[22px] h-[30px] bg-primary text-white text-sm font-semibold rounded-md">
                        Friend
                      </button>
                    ) : friendRequestList.includes(item.userid + data.uid) ||
                      friendRequestList.includes(data.uid + item.userid) ? (
                      <>
                        <button className="px-3 py-2 bg-primary text-white text-sm font-semibold rounded-md">
                          Pending
                        </button>
                      </>
                    ) : (
                      <div onClick={() => handleFriendRequest(item)}>
                        <JoinBtn requestSent={requestSent} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
