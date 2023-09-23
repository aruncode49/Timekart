import React from "react";
import { Link } from "react-router-dom";
import logo from "/images/logo_white.png";

const Footer = () => {
  return (
    <div className="bg-slate-900 px-8 py-4 pb-8 rounded-t-[50px] text-center">
      <img
        className="w-[50px] mx-auto "
        src={logo}
        alt="footer_white_mustache"
      />
      <p className="text-white md:text-lg">
        ©️ 2023 Deal Daddy India, Inc. All Right Reserved
      </p>
      <div className="pt-2 flex md:gap-3 justify-center font-medium text-white">
        <Link className="px-2 hover:scale-105" to="/about">
          About
        </Link>
        |
        <Link className="px-2 hover:scale-105" to="/contact">
          Contact
        </Link>
        |
        <Link className="px-2 hover:scale-105" to="/privacypolicy">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
