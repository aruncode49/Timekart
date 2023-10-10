import React from "react";
import { AiOutlineUser, AiOutlineShopping } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const UserSideBar = () => {
  return (
    <div className="w-[200px] fixed md:relative bg-white">
      <>
        <ul className="flex flex-col">
          <NavLink
            to="/dashboard/user/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 border border-y-gray-300 py-4 pl-3 hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : "bg-none"
              }`
            }
          >
            <AiOutlineUser />
            Update Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className={({ isActive }) =>
              `flex items-center gap-2 border border-y-gray-300 py-4 pl-3 hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : "bg-none"
              }`
            }
          >
            <AiOutlineShopping />
            Orders
          </NavLink>
        </ul>
      </>
    </div>
  );
};

export default UserSideBar;
