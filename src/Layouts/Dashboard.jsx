import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  // Get the current path after /dashboard/
  const current = location.pathname.split("/")[2] || "myParcels";

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Toggle for Small/Medium Devices */}
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar: Only visible on small/medium devices */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-lg font-bold text-primary">
            Quick Parcel Dashboard
          </div>
        </div>
        {/* Main Content */}
        <div className="p-4 min-h-screen bg-base-100">
          <div className="bg-white rounded-lg shadow p-6">
            <Outlet />
          </div>
        </div>
      </div>
      {/* Sidebar: Always visible on large, togglable on small/medium */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <h3 className="text-xl font-bold mb-6 text-primary">Menu</h3>
          <li>
            <Link
              to="/dashboard/myParcels"
              className={`font-medium text-base ${
                current === "myParcels" ? "bg-primary text-white" : ""
              }`}
            >
              📦 My Parcels
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/addParcel"
              className={`font-medium text-base ${
                current === "addParcel" ? "bg-primary text-white" : ""
              }`}
            >
              ➕ Add Parcel
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/payments"
              className={`font-medium text-base ${
                current === "payments" ? "bg-primary text-white" : ""
              }`}
            >
              💳 Payments
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className={`font-medium text-base ${
                current === "settings" ? "bg-primary text-white" : ""
              }`}
            >
              ⚙️ Settings
            </Link>
          </li>
          <li>
            <a className="font-medium text-base text-red-500">🚪 Logout</a>
          </li>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
