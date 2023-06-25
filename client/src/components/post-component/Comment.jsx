import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export const Comment = ({ hideComment, handleHideComment, username, userId, text }) => {
  return (
    <>
      {hideComment?.includes(userId) ? (
        <button
          className=" w-full px-3 py-1 bg-gray-100 flex gap-x-3 items-center rounded"
          onClick={() => handleHideComment(userId)}>
          <div className=" flex flex-col text-black/40 hover:text-black/80 ">
            <MdKeyboardArrowUp className=" w-4 h-4 translate-y-1" />
            <MdKeyboardArrowDown className=" w-4 h-4 -translate-y-1" />
          </div>
          <h1 className="text-black/60 italic text-sm">{username}</h1>
        </button>
      ) : (
        <div className=" flex w-full gap-x-2 h-fit">
          <div className=" flex flex-col gap-y-2 pt-2 items-center  ">
            <div className=" w-9 h-9 rounded-full overflow-hidden">
              <img
                src={"https://res.cloudinary.com/dbsawioum/image/upload/v1686483684/Blog_app/user.png"}
                className=" w-full h-full object-cover"
              />
            </div>
            <button
              className=" flex flex-col text-black/40 hover:text-black/80 "
              onClick={() => handleHideComment(userId)}>
              <MdKeyboardArrowDown className=" w-4 h-4" />
              <MdKeyboardArrowUp className=" w-4 h-4 -translate-y-[7px]" />
            </button>
          </div>
          <div className=" flex flex-grow flex-col gap-y-3 bg-white/60 shadow-[0_0_0.8px_0] shadow-gray-400 p-4">
            <div className=" flex gap-x-2 items-center">
              <h1 className="font-medium">{username}</h1>
              <li className=" text-black/40 text-sm">4 Jun</li>
            </div>
            <h1 className=" text-[17px] text-black/80">{text}</h1>
          </div>
        </div>
      )}
    </>
  );
};
