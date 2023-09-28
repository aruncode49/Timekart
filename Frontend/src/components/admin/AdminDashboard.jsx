import React from "react";
import useAuth from "../../context/AuthContext";
import AdminDashboardTemplate from "./AdminDashboardTemplate";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import adminImage from "/images/admin.png";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <AdminDashboardTemplate title="Admin Dashboard - Deal Daddy">
      {/* Admin Details */}
      {auth.user && (
        <div className="flex gap-2 mt-4 text-lg ">
          <img
            className="rounded-full w-[100px] h-[100px]"
            src={adminImage}
            alt="admin"
          />
          <ul>
            <li className="flex items-center gap-2 py-1">
              <AiOutlineUser />
              {auth?.user?.name}
            </li>
            <li className="flex items-center gap-2 py-1">
              <AiOutlineMail />
              {auth?.user?.email}
            </li>
            <li className="flex items-center gap-2 py-1">
              <AiOutlinePhone />
              {auth?.user?.phone}
            </li>
          </ul>
        </div>
      )}
    </AdminDashboardTemplate>
  );
};

export default AdminDashboard;
