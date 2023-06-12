import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../components/SideNav";
import SideContent from "../components/SideContent";
import Navbar from "../components/Navbar";

export const Layout = () => {
  const location = useLocation();
  const controlUi = ["/login", "/register", "/newuser", "/createpost"];
  console.log(location.pathname);
  return (
    <div className=" h-full w-full bg-gray-100">
      {location.pathname !== "/newuser" && <Navbar />}

      <div className={` w-full h-full md:pt-5 md:flex lg:px-32 md:px-10 gap-x-3 `}>
        {!controlUi.includes(location.pathname) && <SideNav />}
        <Outlet />
        {!controlUi.includes(location.pathname) && <SideContent />}
      </div>
    </div>
  );
};
