import React, { useState, createRef } from "react";
import { LiaHomeSolid } from "react-icons/lia";
import { AiFillMessage, AiFillSetting } from "react-icons/ai";
import { BsBellFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { BiUpload } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const Sidebar = () => {
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();

  const auth = getAuth();
  const navigate = useNavigate();
  const [profileModal, setProfileModal] = useState();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProfileClick = () => {
    setProfileModal(true);
  };

  //Crooper Image
  const onchange = (e) => {
    console.log(e.target.files[0]);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <>
      {profileModal ? (
        <>
          <div className="absolute h-screen w-full bg-red-400 flex justify-center items-center">
            <div className="bg-white rounded p-5">
              <h1 className="text-4xl mb-4">Change Profile Picture</h1>
              <input
                type="file"
                onChange={onchange}
                className="block m-auto mb-5"
              />

              <div className="h-[120px] w-[120px] rounded-full m-auto overflow-hidden">
                <div
                  className="img-preview
                "
                  style={{ width: "100%", height: "100%" }}
                ></div>
              </div>

              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: 400 }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />

              <button className="text-xl mr-5 border border-primary bg-primary px-4 py-1 rounded-lg text-white">
                Upload
              </button>
              <button
                className="text-xl border border-red-400 px-4 py-1 rounded-lg text-red-600"
                onClick={() => setProfileModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-[186px] bg-primary select-none rounded-[20px] flex justify-left gap-10 flex-col h-screen">
          <div className="flex select-none h-[100px] w-[100px] group m-auto rounded-full justify-center mt-[38px] mb-[78px] relative  ">
            <img
              className="h-[100px] w-[100px] rounded-full"
              src="../../src/assets/profile_img.jpg"
            />
            <div
              onClick={handleProfileClick}
              className="absolute cursor-pointer flex justify-center items-center text-4xl transition-all duration-300 text-white h-full group-hover:w-full rounded-full bg-[#0000005d] z-20 "
            >
              <BiUpload className="group-hover:block hidden" />
            </div>
          </div>
          <div className="flex h-full  justify-between flex-col">
            <div className="mb-20 flex flex-col gap-4">
              <div className=" ml-6 py-5 pl-11 relative after:absolute after:bg-white after:w-full after:h-full after:top-0 after:left-0 after:rounded-l-2xl after:-z-10 z-10 before:bg-primary before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl">
                <LiaHomeSolid className="text-5xl text-primary bg-white " />
              </div>
              <div className="ml-6 py-5 pl-11 relative  after:bg-white after:w-full after:h-full after:top-0 after:left-0 after:rounded-l-2xl after:-z-10 z-10 before:bg-primary before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl">
                <AiFillMessage className="text-5xl text-white  " />
              </div>
              <div className="ml-6 py-5 pl-11 relative  after:bg-white after:w-full after:h-full after:top-0 after:left-0 after:rounded-l-2xl after:-z-10 z-10 before:bg-primary before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl">
                <BsBellFill className="text-5xl text-white" />
              </div>
              <div className="ml-6 py-5 pl-11 relative  after:bg-white after:w-full after:h-full after:top-0 after:left-0 after:rounded-l-2xl after:-z-10 z-10 before:bg-primary before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl">
                <AiFillSetting className="text-5xl text-white" />
              </div>
            </div>

            <div className=" ml-6 py-5 pl-11 mb-12 relative after:bg-white after:w-full after:h-full after:top-0 after:left-0 after:rounded-l-2xl after:-z-10 z-10 before:bg-primary before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl">
              <ImExit
                onClick={handleSignOut}
                className="text-5xl text-white cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
