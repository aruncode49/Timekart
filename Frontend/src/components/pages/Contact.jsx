import React from "react";
import Layout from "../layouts/Layout";
import contactImage from "/images/contact.jpg";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us - Deal Daddy"}>
      <div className="md:w-full flex flex-col md:flex-row items-center justify-center md:gap-8 mt-20 text-center ">
        <img
          className="w-[400px] rounded-2xl shadow-md mb-8 md:mb-0 "
          src={contactImage}
          alt="contact support"
        />
        <div>
          <h1 className="text-xl font-medium bg-slate-900 text-white py-1 pl-4 text-center">
            CONTACT US
          </h1>
          <p className="mt-3 text-lg">
            "Connect with me for any inquiries or feedback", Feel free to send
            your thought &darr;
          </p>
          <div className="flex items-center justify-center gap-3 mt-3 text-lg">
            <div className="cursor-pointer flex items-center gap-2 font-medium px-2 py-1 rounded-xl border-2 border-slate-900 hover:scale-105">
              <BsLinkedin />
              <a href="https://www.linkedin.com/in/aruncode49/" target="_blank">
                LinkedIn
              </a>
            </div>
            <div className="cursor-pointer flex items-center gap-2 font-medium px-2 py-1 rounded-xl border-2 border-slate-900 hover:scale-105">
              <BsGithub />
              <a href="https://github.com/aruncode49" target="_blank">
                Github
              </a>
            </div>
            <div className="cursor-pointer flex items-center gap-2 font-medium px-2 py-1 rounded-xl border-2 border-slate-900 hover:scale-105">
              <BiLogoGmail />
              <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank">
                Gmail
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
