import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [isNavLinksShown, setIsNavLinksShown] = useState(false);

  // Navbar
  return (
    <div className="bg-slate-900 text-white">
      <div className="max-w-screen-lg mx-auto px-4 flex justify-between items-center py-3">
        {/* logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <BsCart4 fontSize={34} />
          <h1 className="text text-3xl md:text-4xl font-bold pt-2">
            <span className="text-green-400">D</span>eal{" "}
            <span className="text-green-400">D</span>addy
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1 pt-2">
          <NavLink
            className="text-lg px-2 py-1 font-medium hover:text-green-400"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="text-lg px-2 py-1 font-medium  hover:text-green-400 "
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="text-lg px-2 py-1 font-medium  hover:text-green-400 "
            to="/category"
          >
            Category
          </NavLink>
          <NavLink
            className="text-lg px-2 py-1 font-medium hover:text-green-400 "
            to="/cart"
          >
            <div className="relative mr-2">
              <span className="absolute -top-5 -right-2 text-green-400">0</span>
              <BsCart4 fontSize={26} />
            </div>
          </NavLink>
          <NavLink
            className="text-lg px-2 py-1 ml-2 font-medium border-2 border-white hover:border-green-400 hover:text-green-400 rounded-xl"
            to="/register"
          >
            Register
          </NavLink>
          <NavLink
            className="text-lg px-2 py-1 ml-2 font-medium bg-white outline-none border-none text-slate-900 rounded-xl hover:text-white hover:bg-green-600"
            to="/login"
          >
            Login
          </NavLink>
        </div>

        {/* Nav Links for mobile version */}
        <div className="flex items-center md:hidden z-50">
          <NavLink
            className="text-lg px-2 py-1 font-medium hover:text-green-400 pt-2"
            to="/cart"
          >
            <div className="relative mr-2">
              <span className="absolute -top-5 -right-2 text-green-400">0</span>
              <BsCart4 fontSize={26} />
            </div>
          </NavLink>
          <div
            className="text-green-500 cursor-pointer p-2 mt-2"
            onClick={() => setIsNavLinksShown((prev) => !prev)}
          >
            <GiHamburgerMenu fontSize={34} />
          </div>
        </div>

        {isNavLinksShown && (
          <div className="text-green-400 flex flex-col absolute top-0 right-0 w-1/2 bg-slate-900 pt-[5rem] shadow-xl rounded-xl z-40">
            <NavLink
              className="py-5 text-lg font-medium border-b border-t border-gray-200 pl-8 px-4 hover:bg-slate-600"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="py-5 text-lg font-medium border-b border-t border-gray-200 pl-8 px-4  hover:bg-slate-600"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className="py-5 text-lg font-medium border-b border-b-gray-200 pl-8 px-4  hover:bg-slate-600"
              to="/category"
            >
              Category
            </NavLink>
            <NavLink
              className="py-5 text-lg font-medium border-b border-b-gray-200 pl-8 px-4 hover:bg-slate-600"
              to="/register"
            >
              Register
            </NavLink>
            <NavLink
              className="py-5 text-lg font-medium border-b border-b-gray-200 pl-8 px-4 hover:bg-slate-600 rounded-b-xl"
              to="/login"
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
