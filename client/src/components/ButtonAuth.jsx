import React from "react";

export const ButtonAuth = ({ icon, value, icon2, bgColor, shadow, hoverColor, textColor, type }) => {
  return (
    <button
      className={` p-3 flex items-center gap-x-5 justify-center ${bgColor} ${textColor} shadow-[0_0_0.8px_0]${
        shadow === true ? "shadow-gray-400" : ""
      }  rounded-md ${hoverColor} transition-all duration-200 border border-gray-100`}
      type={type && "submit"}>
      <div className={` w-6 h-full ${!icon && !icon2 && "hidden"}`}>
        {!icon ? icon2 : <img src={icon} className=" w-full h-full" />}
      </div>
      <span className=" font-medium">{value}</span>
    </button>
  );
};
