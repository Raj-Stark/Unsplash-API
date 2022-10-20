import React from "react";
import { useGlobalContext } from "../context";

const Photo = ({
  urls: { regular, full },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  const { setOpenModal, setModalURL } = useGlobalContext();
  const handleClick = () => {
    setOpenModal(true);
    setModalURL(full);
  };

  return (
    <article className=" w-full h-full " onClick={handleClick}>
      <div className=" w-auto  h-80 cursor-pointer ">
        <img
          src={regular}
          alt={alt_description}
          className=" w-full h-full object-cover"
        />
      </div>

      <div className=" bg-black text-white w-auto mt-1 flex justify-between px-2 py-4 ">
        <div>
          <h4 className=" font-semibold text-lg">{name}</h4>
          <p className=" font-medium ">{likes} Likes</p>
        </div>
        <a href={portfolio_url}>
          {" "}
          <img
            src={medium}
            alt={name}
            className=" rounded-full h-12 p-1 border-white border-2 "
          />
        </a>
      </div>
    </article>
  );
};

export default Photo;
