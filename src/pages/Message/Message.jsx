import Sidebar from "../../components/Sidebar";

const Message = () => {
  return (
    <>
      <div className="flex">
        <Sidebar active="message" />
        <div>Hello Chatbox</div>
      </div>
    </>
  );
};

export default Message;
