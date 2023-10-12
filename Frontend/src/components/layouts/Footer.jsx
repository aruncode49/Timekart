import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-8 py-4 pb-16 border-t border-gray-300 text-center w-full mt-20 ">
      <h1
        id="header_logo"
        className="text-3xl font-bold pt-2 tracking-widest mt-5 mb-3"
      >
        <span className="text-green-500">T</span>ime
        <span className="text-green-500">k</span>art
      </h1>
      <p className="text-gray-600 md:text-lg">
        ©️ 2023 Deal Daddy India, Inc. All Right Reserved
      </p>
      <div className="pt-2 flex md:gap-3 justify-center  text-slate-900">
        <Link className="px-2 hover:underline" to="/about">
          About
        </Link>
        |
        <Link className="px-2 hover:underline" to="/contact">
          Contact
        </Link>
        |
        <Link className="px-2 hover:underline" to="/privacypolicy">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
