const Chatbox = () => {
  return (
    <>
      <div className="p-5 mt-2 w-full">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full"
            src="../../../src/assets/profile_img.jpg"
            alt="profile"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-pops font-semibold">Swathi</h1>
            <p>online</p>
          </div>
        </div>
        <div className="bg-gray-200 w-full h-[500px] p-4 mt-4">
          <p className="bg-white px-12 py-4">Hi there</p>
        </div>
        <div>
          <input
            type="text"
            className="border-lg w-full p-2 rounded-lg mt-5"
            placeholder="Type a message"
          />
        </div>
      </div>
    </>
  );
};
export default Chatbox;
