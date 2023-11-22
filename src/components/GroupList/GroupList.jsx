import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const JoinBtn = () => {
  return (
    <>
      <button className="px-[22px] h-[30px] bg-primary text-white text-xl font-semibold rounded-md">
        Join
      </button>
    </>
  );
};

const GroupList = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [show, setShow] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupTag, setGroupTag] = useState("");
  const [group, setGroup] = useState([]);
  const [error, setError] = useState({ name: "", tag: "" });

  const handleShow = () => {
    setShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));

    if (name === "groupName") {
      setGroupName(value);
    } else if (name === "groupTag") {
      setGroupTag(value);
    }
  };

  const handleCreateGroup = () => {
    const newError = {};
    const db = getDatabase();
    const groupRef = ref(db, "group/");

    if (!groupName) {
      newError.groupName = "Please enter a group name.";
    }
    if (!groupTag) {
      newError.groupTag = "Please enter a group tag.";
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }
    if (groupName && groupTag) {
      set(push(groupRef), {
        adminid: data.uid,
        groupname: groupName,
        grouptag: groupTag,
      }).then(() => {
        setGroupName(""), setGroupTag(""), setShow(false);
      });
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "group/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid != data.uid) {
          arr.push(item.val());
        }
      });
      setGroup(arr);
    });
  }, []);

  return (
    <>
      <div>
        <div className="flex items-center justify-between gap-9 rounded-2xl shadow-3xl ml-11 mb-11 py-4 px-5">
          <FiSearch className="text-xl" />
          <input
            type="text"
            className="w-full px-2 outline-none"
            placeholder="search"
          />
          <BiDotsVerticalRounded className="text-xl" />
        </div>
        <div className="w-[427px] h-[387px] p-5 rounded-b-2xl ml-11 shadow-3xl">
          <div className="flex justify-between items-center mb-4">
            <h1>Group List</h1>

            {!show ? (
              <button
                onClick={handleShow}
                className="bg-primary p-2 text-white rounded-lg"
              >
                Create Group
              </button>
            ) : (
              <button
                onClick={() => setShow(false)}
                className="bg-red-500 p-2 text-white rounded-lg"
              >
                Go Back
              </button>
            )}
            {/* <BiDotsVerticalRounded /> */}
          </div>
          {show ? (
            <div>
              <input
                onChange={handleInputChange}
                name="groupName"
                value={groupName}
                className="border mt-5 w-full p-2 rounded-lg"
                type="text"
                placeholder="Group Name"
              />
              <p className="text-red-500">{error.groupName}</p>
              <input
                onChange={handleInputChange}
                name="groupTag"
                value={groupTag}
                className="border mt-5 w-full p-2 rounded-lg"
                type="text"
                placeholder="Group Tagname"
              />
              <p className="text-red-500">{error.groupTag}</p>
              <button
                onClick={handleCreateGroup}
                className="bg-primary mt-5 p-2 rounded-lg w-full text-white"
              >
                Create Group
              </button>
            </div>
          ) : (
            group.map((item) => (
              <div key={item} className="flex gap-4 items-center ">
                <img
                  src="../../../src/assets/profile_img.jpg"
                  alt="name"
                  className="w-[70px] h-[70px] rounded-full"
                />
                <div className="flex w-full justify-between items-center">
                  <div className="">
                    <p className="text-lg font-pops font-semibold">
                      {item.groupname}
                    </p>
                    <p className="text-lightGray text-sm font-pops font-medium">
                      {item.grouptag}
                    </p>
                  </div>
                  <div>
                    <JoinBtn />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default GroupList;
