import React, { useState, createRef } from "react";
import { LiaHomeSolid } from "react-icons/lia";
import { AiFillMessage, AiFillSetting } from "react-icons/ai";
import { BsBellFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { BiUpload } from "react-icons/bi";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getDatabase, ref as dref, update } from "firebase/database";
import { useSelector } from "react-redux";

const Sidebar = ({ active }) => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const db = getDatabase();
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
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

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, data.uid);
      /*   const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL(); */
      const message4 = cropData;
      uploadString(storageRef, message4, "data_url").then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setProfilePhoto(downloadURL);
          setProfileModal(false);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            update(dref(db, "users/" + data.uid), {
              dp: downloadURL,
            });
          });
        });
      });
    }
  };

  //Crooper
  const onchange = (e) => {
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
          <div className="absolute h-[100dvh] w-full bg-red-400 flex justify-center items-center">
            <div className="bg-white rounded p-5">
              <h1 className="text-4xl mb-4">Change Profile Picture</h1>
              <input
                type="file"
                onChange={onchange}
                className="block m-auto mb-5"
              />

              <div className="h-[100px] w-[100px] rounded-full m-auto overflow-hidden">
                <div
                  className="img-preview
                "
                  style={{ width: "100%", height: "100%" }}
                ></div>
              </div>
              {image && (
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
              )}

              <div className="mt-5">
                <button
                  onClick={getCropData}
                  className="text-xl mr-5 border border-primary bg-primary px-4 py-1 rounded-lg text-white"
                >
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
          </div>
        </>
      ) : (
        <div className="w-[100px] bg-primary select-none rounded-[20px] flex justify-left flex-col h-screen">
          <div className="flex select-none h-[80px] w-[80px] group m-auto rounded-full justify-center mt-[38px] mb-[16px] relative  ">
            <img
              className="h-[80px] w-[80px] rounded-full"
              src={data.photoURL}
            />

            <div
              onClick={handleProfileClick}
              className="absolute cursor-pointer flex justify-center items-center text-4xl transition-all duration-300 text-white h-full group-hover:w-full rounded-full bg-[#0000005d] z-20 "
            >
              <BiUpload className="group-hover:block hidden" />
            </div>
          </div>
          <h2 className="text-lg text-white mb-6 font-pops font-semibold text-center">
            {data.displayName}
          </h2>
          <div className="flex h-full  justify-between flex-col">
            <div className=" flex flex-col gap-3">
              <div
                className={`ml-5 py-2 pl-5 relative after:absolute ${
                  active == "Home" ? "after:bg-white" : "after:bg-primary"
                }  after:w-full after:h-full after:top-0 after:left-0 after:rounded-l-2xl after:-z-10 z-10 before:bg-primary before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl`}
              >
                <Link to="/">
                  <LiaHomeSolid
                    className={`text-3xl ${
                      active == "Home" ? "text-primary" : "text-white"
                    } `}
                  />
                </Link>
              </div>
              <div
                className={`ml-5 py-2 pl-5 relative after:absolute ${
                  active == "Message" ? "after:bg-white" : "after:bg-primary"
                }  after:w-full after:h-full after:top-0 after:left-0 after:rounded-l-2xl after:-z-10 z-10 before:bg-primary before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl`}
              >
                <Link to="/Message">
                  <AiFillMessage
                    className={`text-3xl ${
                      active == "Message" ? "text-primary" : "text-white"
                    } `}
                  />
                </Link>
              </div>
              <div className="ml-5 py-2 pl-5 relative  after:bg-white after:w-full after:h-full after:top-0 after:left-0 after:rounded-l-2xl after:-z-10 z-10 before:bg-primary before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl">
                <BsBellFill className="text-3xl text-white" />
              </div>
              <div className="ml-5 py-2 pl-5 relative  after:bg-white after:w-full after:h-full after:top-0 after:left-0 after:rounded-l-2xl after:-z-10 z-10 before:bg-primary before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl">
                <AiFillSetting className="text-3xl text-white" />
              </div>
            </div>

            <div className="ml-5 py-2 pl-5 mb-12 relative after:bg-white after:w-full after:h-full after:top-0 after:left-0 after:rounded-l-2xl after:-z-10 z-10 before:bg-primary before:absolute before:h-full before:w-2 before:top-0 before:right-0 before:rounded-l-2xl">
              <ImExit
                onClick={handleSignOut}
                className="text-3xl text-white cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Sidebar.propTypes = {
  active: PropTypes.string,
};

export default Sidebar;
