import React, { useState } from "react";
import UserSideBar from "./UserSideBar";
import Layout from "../layouts/Layout";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const UserDashboardTemplate = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleSideBarToggler() {
    setIsOpen((prev) => !prev);
  }

  return (
    <Layout title={title}>
      <div className="max-w-screen-lg mx-auto">
        {/* Admin Panel Heading */}
        <div onClick={handleSideBarToggler} className="flex items-center gap-2">
          <div className="flex items-center justify-center gap-2 border-b py-2 cursor-pointer text-2xl font-medium mt-3 bg-gray-200 w-12 mb-2 rounded-lg">
            {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
          </div>
          <h1 className="text-xl font-medium">User Dashboard</h1>
        </div>
        <div className="flex gap-3">
          {/* Side Menu */}
          {isOpen && (
            <div>
              <UserSideBar />
            </div>
          )}
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboardTemplate;
