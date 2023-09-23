import React from "react";
import Layout from "../layouts/Layout";
import contactImage from "/images/contact.jpg";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-8 pb-10 text-center">
        <img className="w-[400px]" src={contactImage} alt="contact support" />
        <div>
          <h1 className="text-xl font-medium bg-slate-900 text-white py-1 pl-4 text-center">
            CONTACT US
          </h1>
          <p className="mt-3 text-lg">
            "Connect with me for any inquiries or feedback", Feel free to send
            your thought &darr;
          </p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="flex items-center gap-2 font-medium">
              <BsLinkedin />
              <a href="https://www.linkedin.com/in/aruncode49/" target="_blank">
                LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <BsGithub />
              <a href="https://github.com/aruncode49" target="_blank">
                Github
              </a>
            </div>
            <div className="flex items-center gap-2 font-medium">
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
