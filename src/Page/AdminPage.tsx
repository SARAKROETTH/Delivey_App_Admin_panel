import {
  Bell,
  LayoutDashboard,
  PackageOpen,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "../Contexts/AuthContext";
export default function AdminPage() {
  const [showSidebar, setShowSidebar] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }
  }, [logout]);

  return (
    <>
      <section className=" flex w-screen h-screen ">
        <div
          className={` transition-all duration-300 ${showSidebar ? "w-12" : "w-64"}  h-full border-r border-gray-300 overflow-hidden`}
        >
          <div className=" gap-2 p-4 flex items-center w-full h-1/9 ">
            <img src="src\assets\react.svg" alt="" />
            {!showSidebar && (
              <span className=" font-bold text-lg">Admin Panel</span>
            )}
          </div>
          <div className="  w-full h-svh">
            <h1 className="p-1 text-gray-300">Main</h1>

            <div className=" w-full ">
              <div className="group hover:bg-green-500 border border-gray-200 hover:border-r-4 transition-all duration-100 hover:border-green-600 cursor-pointer p-2 flex items-center gap-2">
                <LayoutDashboard className=" group-hover:text-green-600" />
                <h1 className=" group-hover:text-white text-sm font-bold">
                  Dashboard
                </h1>
              </div>
            </div>
            <h1 className="p-1 text-gray-300">Product</h1>
            <div className="full">
                <div className="group hover:bg-green-500 border border-gray-200 hover:border-r-4 transition-all duration-100 hover:border-green-600 cursor-pointer p-2 flex items-center gap-2">
                <PackageOpen className=" group-hover:text-green-600" />
                <h1 className=" group-hover:text-white text-sm font-bold">
                  Product Orders
                </h1>
              </div>

              <div className="group hover:bg-green-500 border border-gray-200 hover:border-r-4 transition-all duration-100 hover:border-green-600 cursor-pointer p-2 flex items-center gap-2">
                <PackageOpen className=" group-hover:text-green-600" />
                <h1 className=" group-hover:text-white text-sm font-bold">
                  Product
                </h1>
              </div>

            </div>
          </div>
        </div>
        <div className=" grow bg-white">
          <div className=" p-4 h-1/9 border-b border-gray-300 flex gap-4 items-center justify-between w-full ">
            <div className="flex items-center gap-4">
              {showSidebar ? (
                <PanelLeftOpen
                  onClick={() => setShowSidebar(false)}
                  className=" text-gray-300 cursor-pointer"
                />
              ) : (
                <PanelLeftClose
                  onClick={() => setShowSidebar(true)}
                  className=" text-gray-300 cursor-pointer"
                />
              )}

              <input
                type="text"
                placeholder="Search..."
                className=" h-9 rounded p-2 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="p-2 border rounded ">
                <Search className="p-1" />
              </div>
            </div>

            <div className=" items-center gap-4 ">
              <div className=" flex items-center gap-4">
                <Bell />

                <div className="relative group">
                  <div className=" flex bg-green-500  cursor-pointer gap-2 h-12 w-38 rounded-4xl p-1 border border-white shadow  items-center">
                    <img
                      className="w-10 h-10 rounded-full object-contain border border-white "
                      src={user?.image}
                      alt=""
                    />
                    <div className=" flex flex-col">
                      <h1 className=" text-white text-sm font-bold">
                        {user?.name}
                      </h1>
                      <p className=" text-sm text-white  font-thin">Admin</p>
                    </div>
                  </div>
                  <div className=" hidden hover:block group-hover:block bg-white absolute rounded shadow w-full">
                    <ul className="  flex flex-col gap-2 p-2">
                      <li className=" p-2 rounded hover:bg-gray-200 cursor-pointer">
                        Profile
                      </li>
                      <li className=" p-2 rounded hover:bg-gray-200 cursor-pointer">
                        Settings
                      </li>
                      <li
                        onClick={logout}
                        className=" p-2 rounded hover:bg-red-400 hover:text-white cursor-pointer"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
