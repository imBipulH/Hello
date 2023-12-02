import { BiDotsVerticalRounded } from "react-icons/bi";
import profile from "../../assets/profile_img.jpg";
const Chatbox = () => {
  return (
    <>
      <div className="w-full p-2">
        <div className="flex justify-between items-center border-b py-2">
          <div className="flex items-center">
            <img src={profile} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex flex-col">
              <h1 className="font-pops font-semibold text-lg">Ador Ador</h1>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <BiDotsVerticalRounded />
        </div>
        <div></div>
      </div>
    </>
  );
};
export default Chatbox;
