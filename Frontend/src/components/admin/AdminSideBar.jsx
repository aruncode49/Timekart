import React from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BiCategory, BiTennisBall } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div className="w-[200px] shadow-lg fixed md:relative bg-white">
      <>
        <ul className="flex flex-col">
          <NavLink
            to="/dashboard/admin/create-category"
            className={({ isActive }) =>
              `flex items-center gap-2 border border-y-gray-300 py-4 pl-3 hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : "bg-none"
              }`
            }
          >
            <BiCategory />
            Manage Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className={({ isActive }) =>
              `flex items-center gap-2 border border-y-gray-300 py-4 pl-3 hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : "bg-none"
              }`
            }
          >
            <AiOutlineShoppingCart />
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-2 border border-y-gray-300 py-4 pl-3 hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : "bg-none"
              }`
            }
          >
            <AiOutlineUser />
            Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-2 border border-y-gray-300 py-4 pl-3 hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : "bg-none"
              }`
            }
          >
            <BiTennisBall />
            All Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-2 border border-y-gray-300 py-4 pl-3 hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : "bg-none"
              }`
            }
          >
            <AiOutlineShoppingCart />
            Manage Orders
          </NavLink>
        </ul>
      </>
    </div>
  );
};

export default AdminSideBar;
