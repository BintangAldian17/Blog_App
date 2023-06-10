import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Home from "../page/Home";
import SideNav from "../components/SideNav";
import SideContent from "../components/SideContent";
import Navbar from "../components/Navbar";

export const Layout = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className=" h-full w-full bg-gray-100">
      <Navbar />
      <div className={` w-full h-full md:pt-5 md:flex lg:px-32 md:px-10 gap-x-3 `}>
        {location.pathname !== "/login" && <SideNav />}
        <Outlet />
        {location.pathname !== "/login" && <SideContent />}
      </div>
    </div>
  );
};
