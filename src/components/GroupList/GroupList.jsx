import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

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
            <BiDotsVerticalRounded />
          </div>
          <div className="flex gap-4 items-center ">
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
        </div>
      </div>
    </>
  );
};

export default GroupList;
