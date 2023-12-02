import Sidebar from "../../components/Sidebar";
import GroupList from "../../components/GroupList/GroupList";
import Friends from "../../components/Friends/Friends";
import Chatbox from "../../components/Chatbox/Chatbox";

const Message = () => {
  return (
    <>
      <div className="w-[1320px] mx-auto">
        <div className="flex">
          <Sidebar active="Message" />
          <div className="h-full w-1/2">
            <GroupList className="h-1/2" />
            <Friends className="h-1/2" />
          </div>
          <div className="mt-4 ml-4 px-4 border shadow-3xl mb-4 w-full">
            <Chatbox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
