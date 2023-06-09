import { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { HiMenuAlt1 } from "react-icons/hi";
import { NavContext } from "../Providers/NavProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openNav, setOpenNav } = useContext(NavContext);
  return (
    <header className=" w-full h-14 bg-white shadow-[3px_0_1px_0] shadow-gray-600 sticky top-0 z-50">
      <nav className=" flex items-center justify-between lg:px-24 md:px-10 px-2 w-full h-full py-2">
        {/* Search input */}
        <div className=" w-full h-full flex items-center gap-x-4 md:pl-0 pl-1">
          {/*Hamburger menu  */}
          <button className=" h-full w-7 block md:hidden" onClick={() => setOpenNav(!openNav)}>
            <HiMenuAlt1 className=" w-full h-full" />
          </button>
          <Link
            to="/"
            className=" w-12 md:h-full h-[94%] rounded bg-neutral-950 text-white font-bold flex items-center justify-center text-lg">
            <h1>HEI</h1>
          </Link>
          <div className=" lg:w-[30%] md:w-[40%] h-full hidden items-center relative rounded-md overflow-hidden md:flex">
            <input
              type="text"
              placeholder="Search.."
              className=" px-3 flex items-center rounded-md h-full bg-white border-gray-400 border w-full focus:outline-none focus:border-blue-700 focus:border-[2.1px]"
            />
            <button className=" h-full w-9 absolute right-0 flex items-center justify-center px-2 hover:bg-blue-300 transition-all ease-in-out duration-150">
              <BsSearch className=" w-7 h-full" />
            </button>
          </div>
        </div>
        {/* Nav button */}
        <div className=" w-fit h-full flex gap-x-3">
          {/* Hidden when md */}
          <div className=" h-full w-6 md:hidden">
            <BsSearch className=" w-full h-full" />
          </div>
          {/* hidden when small */}
          <Link
            to="/login"
            className=" w-20 h-full md:flex items-center justify-center bg-white border border-blue-600 rounded-md font-base hover:bg-blue-600 transition-all ease-in-out duration-300 text-blue-600 hover:text-white hover:font-semibold hidden">
            Login
          </Link>
          {/* Still when diffrent BP */}
          <button className=" md:w-36 w-32 h-full bg-white border border-blue-600 rounded-md font-base hover:bg-blue-600 transition-all ease-in-out duration-300 text-blue-600 hover:text-white hover:font-semibold md:font-normal font-medium text-sm md:text-base">
            Create Account
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
