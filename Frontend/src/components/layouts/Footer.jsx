import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "/images/footer_logo.png";

const Footer = () => {
  return (
    <div className="px-8 py-4 pb-16 border-t border-gray-300 text-center w-full mt-20 ">
      <img
        className="w-[50px] mx-auto "
        src={footerLogo}
        alt="footer_white_mustache"
      />
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
