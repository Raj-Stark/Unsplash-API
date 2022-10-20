import React from "react";
import { useGlobalContext } from "../context";
import { FaWindowClose } from "react-icons/fa";

const Modal = ({ url }) => {
  const { setOpenModal, modalURL } = useGlobalContext();

  const handleClick = () => {
    setOpenModal(false);
  };

  return (
    <div className=" fixed w-screen  h-screen  backdrop-blur-sm ">
      <div className=" max-w-screen-2xl mx-auto flex justify-center h-full  items-center px-8 ">
        <div className=" max-w-4xl h-5/6 ">
          <img
            src={modalURL}
            alt=""
            className=" mt-10 w-full h-full object-cover "
          />
        </div>

        <button
          className=" fixed top-10 right-10 text-red-600 text-2xl"
          onClick={handleClick}
        >
          <FaWindowClose size={30}></FaWindowClose>
        </button>
      </div>
    </div>
  );
};

export default Modal;
