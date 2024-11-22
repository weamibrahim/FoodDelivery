import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiUsers } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { SlBasketLoaded } from "react-icons/sl";

function Sidebar() {
  const [open, setOpen] = useState(false);

  // Toggle the sidebar open/close state
  const handleOpen = () => setOpen(!open);

  return (
    <>
      {/* Sidebar toggle button */}
      <button
        onClick={handleOpen}
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 my-5 ms-36 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <NavLink to="/" className="flex items-center ps-2.5 mb-5 mt-7">
            <img
              src="/pngwing.com (10).png"
              alt="Your Company"
              className="h-12 w-auto hidden md:block"
            />
            <span className="self-center ms-3 text-xl font-semibold whitespace-nowrap dark:text-white">Restaurant</span>
          </NavLink>
          <ul className="space-y-2 font-medium mt-14">
            <li>
              <NavLink to="dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <MdDashboard className="text-3xl" />
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>

            <li className="mb-5">
              <NavLink to="/dashboard/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <HiUsers className="text-3xl" />
                <span className="ms-3">Users</span>
              </NavLink>
            </li>

            <li className="mb-5">
              <NavLink to="/dashboard/foods" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <IoFastFoodSharp className="text-3xl" />
                <span className="ms-3">Foods</span>
              </NavLink>
            </li>

            <li className="mb-5">
              <NavLink to="/dashboard/orders" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <SlBasketLoaded className="text-3xl" />
                <span className="ms-3">Orders</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
