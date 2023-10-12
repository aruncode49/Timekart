import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import toast from "react-hot-toast";
import useAuth from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

// material ui component
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const [isNavLinksShown, setIsNavLinksShown] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cartItem, setCartItem] = useCart();

  const [cookies, setCookies, removeCookies] = useCookies(["token"]);

  // functionality for dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle logout function
  function handleLogOut() {
    localStorage.removeItem("auth");
    removeCookies("token");
    setAuth({
      user: null,
    });
    toast.success("User Successfully Logged Out", { duration: 3000 });
  }

  // Navbar
  return (
    <div className="bg-slate-900 text-white py-1">
      <div className="mx-auto px-2 md:px-6 flex justify-between items-center py-3">
        {/* logo */}
        <NavLink to={"/"}>
          <div className="flex items-center gap-2 cursor-pointer">
            <h1
              id="header_logo"
              className="text-4xl md:text-5xl font-bold pt-2 tracking-widest"
            >
              <span className="text-green-500">T</span>ime
              <span className="text-green-500">k</span>art
            </h1>
          </div>
        </NavLink>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1 pt-2">
          <NavLink className={`text-lg px-2 py-1 hover:text-green-400 `} to="/">
            Home
          </NavLink>
          <NavLink
            className={`text-lg px-2 py-1 hover:text-green-400 `}
            to="/about"
          >
            About
          </NavLink>

          <NavLink
            className={`text-lg px-2 py-1 hover:text-green-400 `}
            to="/cart"
          >
            <div className="relative mr-2 flex gap-1">
              <h1>Cart</h1>
              <span className="absolute -top-3 -right-2 bg-red-500 text-sm w-5 h-5 text-center rounded-full text-white ">
                {cartItem?.length}
              </span>
              <BsCart4 fontSize={26} />
            </div>
          </NavLink>

          {/* Logout functionality */}
          {auth.user ? (
            <>
              {/* User Drop Down */}
              <div className="text-white">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  {auth?.user?.name.split(" ")[0]} <AiOutlineDown />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <NavLink onClick={handleLogOut} to="/">
                      Logout
                    </NavLink>
                  </MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <>
              {/* Register */}
              <NavLink
                className={({ isActive }) =>
                  `text-lg px-2 py-1 ml-2 border border-white hover:border-green-400 hover:text-green-400 rounded-xl ${
                    isActive
                      ? "border-green-400 text-green-400"
                      : "border-white text-white"
                  }`
                }
                to="/register"
              >
                Register
              </NavLink>
              {/* Login */}
              <NavLink
                className="text-lg px-2 py-1 ml-2  bg-white outline-none border-none text-slate-900 rounded-xl hover:text-white hover:bg-green-600"
                to="/login"
              >
                Login
              </NavLink>
            </>
          )}
        </div>

        {/* Nav Links for mobile version */}
        <div className="flex items-center md:hidden z-50">
          <NavLink
            className="text-lg px-2 py-2 font-medium hover:text-green-400 "
            to="/cart"
          >
            <div className="relative px-2 py-1 mr-1 flex gap-1">
              <span className="absolute -top-2 -right-2 bg-red-500 text-sm w-5 h-5 text-center rounded-full text-white ">
                {cartItem?.length}
              </span>
              <BsCart4 fontSize={26} />
            </div>
          </NavLink>
          <div
            className="text-green-500 cursor-pointer p-2 "
            onClick={() => setIsNavLinksShown((prev) => !prev)}
          >
            {isNavLinksShown ? (
              <AiOutlineClose fontSize={30} />
            ) : (
              <GiHamburgerMenu fontSize={30} />
            )}
          </div>
        </div>

        {isNavLinksShown && (
          <div className="text-green-400 flex flex-col absolute top-0 right-0 w-1/2 bg-slate-900 pt-[5rem] shadow-xl rounded-xl z-40">
            <NavLink
              className="py-5 text-lg border-b border-t border-gray-200 pl-8 px-4 hover:bg-slate-600"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="py-5 text-lg border-b border-t border-gray-200 pl-8 px-4  hover:bg-slate-600"
              to="/about"
            >
              About
            </NavLink>

            {auth.user ? (
              <>
                {/* Logout */}
                <NavLink
                  className="py-5 text-lg  border-b border-b-gray-200 pl-8 px-4 hover:bg-slate-600 rounded-b-xl"
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  className="py-5 text-lg  border-b border-b-gray-200 pl-8 px-4 hover:bg-slate-600 rounded-b-xl"
                  to="/login"
                  onClick={handleLogOut}
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                {/* Register */}
                <NavLink
                  className="py-5 text-lg  border-b border-b-gray-200 pl-8 px-4 hover:bg-slate-600"
                  to="/register"
                >
                  Register
                </NavLink>
                {/* Login */}
                <NavLink
                  className="py-5 text-lg  border-b border-b-gray-200 pl-8 px-4 hover:bg-slate-600 rounded-b-xl"
                  to="/login"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
