import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const JoinBtn = () => {
  return (
    <>
      <button className="px-2 py-1 bg-primary text-white text-sm  rounded-sm">
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
      <div className="h-full">
        <div className="w-full h-full px-5 py-3 rounded-b-2xl shadow-3xl">
          <div className="flex justify-between items-cente mb-4">
            <h1 className="text-xl font-pops font-semibold">Group List</h1>
            {!show ? (
              <button
                onClick={handleShow}
                className="bg-primary font-bold text-sm py-1  px-2 text-white rounded-sm"
              >
                Create Group
              </button>
            ) : (
              <button
                onClick={() => setShow(false)}
                className="bg-red-500 text-sm py-1 px-2 text-white rounded-sm"
              >
                Go Back
              </button>
            )}
          </div>

          <div className="flex items-center justify-between rounded-lg shadow-3xl mb-0 py-2 px-5">
            <input
              type="text"
              className="w-full px-2 outline-none"
              placeholder="Search"
            />
            <FiSearch className="text-xl select-none" />
          </div>
          <div className="flex justify-between items-center mb-3"></div>
          <div className="flex flex-col h-[200px] overflow-y-scroll ">
            {show ? (
              <div className="">
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
                <div key={item} className="flex mb-4 gap-2 items-center ]">
                  <img
                    src="../../../src/assets/profile_img.jpg"
                    alt="name"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <div className="flex w-full justify-between items-center">
                    <div className="">
                      <p className="text-sm font-pops font-semibold">
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
      </div>
    </>
  );
};

export default GroupList;
