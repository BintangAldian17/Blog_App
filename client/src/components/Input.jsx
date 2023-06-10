import React from "react";

export const Input = ({ label, value, register, watchValue, errors }) => {
  return (
    <div className=" w-full relative">
      <input
        className={` ${
          errors ? " border-red-600" : "border-gray-300 focus:border-blue-600"
        } peer w-full p-4 rounded-md outline-none transition border `}
        {...register(value, {
          require: true,
        })}
        autoComplete="off"
        type={label}
      />
      <label
        className={`${watchValue ? "-translate-y-7 scale-75" : ""} ${
          errors ? " text-red-600" : ""
        } absolute duration-150 transform -translate-y-3 top-7 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 text-zinc-400`}>
        {label}
      </label>
    </div>
  );
};
