import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import HamburgerMenu from "../components/HamburgerMenu";
import { RxCross2 } from "react-icons/rx";
import DashBoard from "../components/DashBoard";
import RecentTask from "../components/RecentTask";
import SideBar from "../components/SideBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateTask from "../components/CreateTask";
import Task from "../components/Task";
import EditTask from "../components/EditTask";
import AllTask from "../components/AllTask";
import About from "../components/About";
import { useSelector } from "react-redux";

function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  const handleShowMenu = () => {
    setShowMenu(prev => !prev);
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

  if (!currentUser) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold text-3xl">
        <p>Sign in first to use our services</p>
        <Link to="/signin">
          <button className="mt-5 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 text-white font-bold shadow-md hover:from-pink-600 hover:via-purple-600 hover:to-purple-700 transition duration-300">
            Sign In
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-pink-200 via-purple-300 to-purple-400 min-h-screen text-white">
      <div className="flex justify-between items-center p-4  ">
        <div className=" font-semibold backdrop-blur-md rounded-full p-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          <span className="text-3xl text-blue-300 font-bold">T</span>m
        </div>
        <div onClick={handleShowMenu} className="text-3xl bg-transparent cursor-pointer lg:hidden">
          {showMenu ? <RxCross2 /> : <HiOutlineMenuAlt1 />}
        </div>
      </div>
      {showMenu && <HamburgerMenu />}
      <div className="flex ">
        <div className="hidden lg:block lg:w-1/5  min-h-screen">
          <SideBar />
        </div>
        <div className="lg:w-4/5 w-full p-6">
          {tab === "dashboard" && (
            <>
              <DashBoard />
              <RecentTask />
            </>
          )}
          {tab === "create-task" && <CreateTask />}
          {tab === "task" && <Task />}
          {tab === "edit-task" && <EditTask />}
          {tab === "all-task" && <AllTask />}
          {tab === "about" && <About />}
        </div>
      </div>
    </div>
  );
}

export default Home;
