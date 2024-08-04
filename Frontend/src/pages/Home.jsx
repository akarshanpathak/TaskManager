import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import HamburgerMenu from "../components/HamburgerMenu";
import { RxCross2 } from "react-icons/rx";
import DashBoard from "../components/DashBoard";
import RecentTask from "../components/RecentTask";
import SideBar from "../components/SideBar";
import { useLocation, useNavigate } from "react-router-dom";

import CreateTask from "../components/CreateTask";
import Task from "../components/Task";
import EditTask from "../components/EditTask";

function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab") || "dashboard";
    if (!urlParams.get("tab")) {
      urlParams.set("tab", "dashboard");
      navigate(`/?${urlParams.toString()}`);
    }
    setTab(tabFromUrl);
  }, [location.search, navigate]);

  return (
    <div className="bg-slate-900 box-border min-h-screen w-full text-white">
      <div className="flex justify-between items-center p-4">
        <div className="border-2 font-semibold backdrop-blur-md rounded-full p-2">
          <span className="text-3xl text-blue-300 font-bold">T</span>m
        </div>
        <div onClick={handleShowMenu} className="text-3xl cursor-pointer lg:hidden">
          {showMenu ? <RxCross2 /> : <HiOutlineMenuAlt1 />}
        </div>
      </div>
      <div className="">{showMenu && <HamburgerMenu />}</div>
      <div className="w-[100vw] flex">
        <div className="hidden lg:inline shadow-md shadow-gray-800 border-blue-300 min-h-screen min-w-[20%]">
          <SideBar />
        </div>
        <div className="lg:w-[80%] w-full">
          {tab === "dashboard" && (
            <>
              <DashBoard />
              <RecentTask />
            </>
          )}
          {tab === "create-task" && <CreateTask />}
          {tab === "task" && <Task />}
          {tab === "edit-task" && <EditTask />}
        </div>
      </div>
    </div>
  );
}

export default Home;
