import { FaGamepad } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { TbHanger } from "react-icons/tb";
import { RiMovie2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import { NavContext } from "../Providers/NavProvider";

const SideNav = () => {
  const { openNav, setOpenNav } = useContext(NavContext);
  const [checkWidth, setCheckwidth] = useState(false);
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

  const dataCategory = [
    {
      id: 1,
      icons: <FaGamepad className=" w-7 h-7" />,
      desc: "Game",
    },
    {
      id: 2,
      icons: <GrTechnology className=" w-7 h-7" />,
      desc: "Technology",
    },
    {
      id: 3,
      icons: <MdOutlineSportsBasketball className=" w-7 h-7" />,
      desc: "Sports",
    },
    {
      id: 4,
      icons: <TbHanger className=" w-7 h-7" />,
      desc: "Fashion",
    },
    {
      id: 5,
      icons: <RiMovie2Fill className=" w-7 h-7" />,
      desc: "Movies",
    },
  ];

  return (
    <div
      className={`${
        openNav || checkWidth ? " visible" : "hidden"
      } h-full md:w-[40%] md:flex sticky md:z-20  z-[99] w-full md:bg-transparent bg-black/30 md:relative transition-all ease-in-out duration-300`}>
      <div className=" md:rounded-md flex-col flex md:w-full w-[70%] md:h-fit h-full bg-white shadow-[0_0_0.8px_0] shadow-gray-400 ">
        <div className=" md:hidden flex justify-between py-5 px-5 border-b border-gray-200 w-full items-center">
          <h1 className=" font-semibold text-xl ">Blog App</h1>
          <button className=" w-6 h-6" onClick={() => setOpenNav(!openNav)}>
            <RxCross2 className=" w-full h-full" />
          </button>
        </div>
        <div className=" w-full h-fit py-2 px-5 md:border-b border-gray-200 font-semibold text-xl">Category</div>
        <div className=" w-full h-fit flex flex-col px-2 py-2">
          {dataCategory.map((e) => {
            return (
              <div
                className=" w-full h-14 flex px-5 rounded-md items-center justify-start gap-x-5 hover:bg-blue-600 hover:text-white cursor-pointer transition-all ease-in-out duration-200"
                key={e.id}>
                {e.icons}
                <h1 className=" text-lg font-medium">{e.desc}</h1>
              </div>
            );
          })}
        </div>
        {/* Hidden when md */}
        <div className=" w-full h-fit flex flex-col items-center gap-y-3 md:hidden">
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
