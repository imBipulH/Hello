import Sidebar from "../../components/Sidebar";
import GroupList from "../../components/GroupList/GroupList";
import Friends from "../../components/Friends/Friends";
import Chatbox from "../../components/Chatbox/Chatbox";

const Message = () => {
  return (
    <>
      <div className="max-w-[1320px] m-auto">
        <div className="flex">
          <Sidebar active="Message" />
          <div className="h-full">
            <GroupList className="h-1/2" />
            <Friends />
          </div>
          <div className="w-full">
            <Chatbox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
