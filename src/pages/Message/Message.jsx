import Sidebar from "../../components/Sidebar";
import GroupList from "../../components/GroupList/GroupList";
import Friends from "../../components/Friends/Friends";
import Chatbox from "../../components/Chatbox/Chatbox";

const Message = () => {
  return (
    <>
      <div className="w-[1320px] m-auto">
        <div className="flex gap-4 justify-start">
          <Sidebar className="w-[100px] mr-8" active="Message" />
          <div className="h-full flex flex-col gap-3 w-[350px]">
            <GroupList className="h-1/2" />
            <Friends className="h-1/2" />
          </div>
          <div className="w-2/3">
            <Chatbox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
