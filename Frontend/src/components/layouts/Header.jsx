import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [isNavLinksShown, setIsNavLinksShown] = useState(false);

  // Navbar
  return (
    <div className="max-w-screen-lg mx-auto px-4 flex justify-between items-center py-3">
      {/* logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <BsCart4 fontSize={34} color="black" />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 pt-2">
          Deal Daddy
        </h1>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-1 pt-2">
        <NavLink
          className="text-lg px-2 py-1 font-medium hover:scale-105 hover:border-b-2 hover:border-slate-900"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="text-lg px-2 py-1 font-medium hover:scale-105 hover:border-b-2 hover:border-slate-900"
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className="text-lg px-2 py-1 font-medium hover:scale-105 hover:border-b-2 hover:border-slate-900"
          to="/category"
        >
          Category
        </NavLink>
        <NavLink
          className="text-lg px-2 py-1 font-medium hover:scale-105 hover:border-b-2 hover:border-slate-900"
          to="/cart"
        >
          Cart <span>(0)</span>
        </NavLink>
        <NavLink
          className="text-lg px-2 py-1 ml-2 font-medium hover:scale-105 border-2 border-black rounded-lg"
          to="/register"
        >
          Register
        </NavLink>
        <NavLink
          className="text-lg px-2 py-1 ml-2 font-medium hover:scale-105 bg-slate-900 outline-none border-none text-white rounded-lg"
          to="/login"
        >
          Login
        </NavLink>
      </div>

      {/* Nav Links for mobile version */}
      <div
        className="md:hidden cursor-pointer p-2 z-10 mt-2"
        onClick={() => setIsNavLinksShown((prev) => !prev)}
      >
        <GiHamburgerMenu fontSize={34} />
      </div>
      {isNavLinksShown && (
        <div className="flex flex-col absolute top-0 right-0 w-1/2 bg-white pt-16 shadow-md">
          <NavLink
            className="py-5 text-lg font-medium border-b border-t border-gray-200 pl-8 px-4 "
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="py-5 text-lg font-medium border-b border-t border-gray-200 pl-8 px-4 "
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="py-5 text-lg font-medium border-b border-b-gray-200 pl-8 px-4 "
            to="/category"
          >
            Category
          </NavLink>
          <NavLink
            className="py-5 text-lg font-medium border-b border-b-gray-200 pl-8 px-4 "
            to="/cart"
          >
            Cart <span>(0)</span>
          </NavLink>
          <NavLink
            className="py-5 text-lg font-medium border-b border-b-gray-200 pl-8 px-4"
            to="/register"
          >
            Register
          </NavLink>
          <NavLink
            className="py-5 text-lg font-medium border-b border-b-gray-200 pl-8 px-4"
            to="/login"
          >
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
