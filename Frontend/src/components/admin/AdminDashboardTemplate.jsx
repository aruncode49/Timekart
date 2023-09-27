import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import Layout from "../layouts/Layout";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const AdminDashboardTemplate = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleSideBarToggler() {
    setIsOpen((prev) => !prev);
  }

  return (
    <Layout>
      <div className="">
        {/* Admin Panel Heading */}
        <div
          onClick={handleSideBarToggler}
          className="flex w-full items-center gap-2 border-b py-2 cursor-pointer text-2xl font-medium mt-3"
        >
          {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
          <h1>Admin Panel</h1>
        </div>
        <div className="flex gap-3">
          {/* Side Menu */}
          {isOpen && (
            <div>
              <AdminSideBar />
            </div>
          )}
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboardTemplate;
