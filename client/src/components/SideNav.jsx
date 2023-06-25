import { FaGamepad } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { TbHanger } from "react-icons/tb";
import { RiMovie2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import { NavContext } from "../Providers/NavProvider";
import Category from "../static/category.json";
import { CategoryContext } from "../Providers/CategoryContext";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../Providers/AuthContext";

const SideNav = () => {
  const { openNav, setOpenNav } = useContext(NavContext);
  const { currentUser } = useContext(AuthContext);
  const [checkWidth, setCheckwidth] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("top");
  const category = searchParams.get("category");

  const handleCategorysChange = (newCategory) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (filter) {
      newSearchParams.set("category", newCategory);
      newSearchParams.set("top", filter);
    } else {
      newSearchParams.set("category", newCategory);
    }
    setSearchParams(newSearchParams);
  };
  // check width
  useEffect(() => {
    const handleCurrentWidth = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth > 768) {
        setCheckwidth(true);
      } else {
        setCheckwidth(false);
      }
    };
    window.addEventListener("resize", handleCurrentWidth);
    handleCurrentWidth();
    return () => {
      window.removeEventListener("resize", handleCurrentWidth);
    };
  }, []);

  return (
    <div
      className={`${
        openNav || checkWidth ? " visible" : "hidden"
      } h-full md:w-[30%] md:flex absolute md:z-20  w-full md:bg-transparent bg-black/60 md:relative transition-all ease-in-out duration-300`}>
      <div className=" md:rounded-md flex-col flex md:w-full w-[80%] md:h-fit h-screen md:static fixed top-0 ">
        <div className=" md:hidden flex justify-between py-5 px-5 border-b border-gray-200 w-full items-center">
          <h1 className=" font-semibold text-xl ">Blog App</h1>
          <button className=" w-6 h-6" onClick={() => setOpenNav(!openNav)}>
            <RxCross2 className=" w-full h-full" />
          </button>
        </div>
        {/* Navigation Category */}
        <div className=" w-full h-fit p px-3 pl-5 font-semibold text-lg">Category</div>
        <div className=" w-full h-fit flex flex-col px-1 py-1 gap-y-1">
          {Category.dataCategory.map((e) => {
            return (
              <button
                onClick={() => {
                  handleCategorysChange(e.desc.toLocaleLowerCase());
                  setOpenNav(!openNav);
                }}
                className={`${
                  category === e.desc.toLocaleLowerCase() && " bg-blue-300 text-white"
                } w-full py-2 flex px-2 rounded-md items-center justify-start gap-x-3 hover:bg-blue-300 hover:text-white cursor-pointer transition-all ease-in-out duration-200`}
                key={e.id}>
                <img src={e.icons} alt="game-icon" className=" w-6 h-6" />
                <h1 className=" text-lg font-medium">{e.desc}</h1>
              </button>
            );
          })}
        </div>
        {/* Hidden when md */}
        <div className={` ${currentUser ? "hidden" : "flex"} w-full h-fit  flex-col items-center gap-y-3 md:hidden`}>
          <button className=" md:w-36 w-32 h-10 bg-white border border-blue-600 rounded-md font-base hover:bg-blue-600 transition-all ease-in-out duration-300 text-blue-600 hover:text-white hover:font-semibold md:font-normal font-medium text-sm md:text-base">
            Create Account
          </button>
          <button className=" w-20 h-10 bg-white border border-blue-600 rounded-md font-base hover:bg-blue-600 transition-all ease-in-out duration-300 text-blue-600 hover:text-white hover:font-semibold md:font-normal font-medium text-sm md:text-base">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
