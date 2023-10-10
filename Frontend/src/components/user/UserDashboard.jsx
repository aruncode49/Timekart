import React from "react";
import useAuth from "../../context/AuthContext";
import UserDashboardTemplate from "./UserDashboardTemplate";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import userImage from "/images/user.png";

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <UserDashboardTemplate title="Dashboard User - Deal Daddy">
      {/* Admin Details */}
      {auth?.user && (
        <div className="flex gap-2 mt-4 text-lg ">
          <img
            className="rounded-full w-[100px] h-[100px]"
            src={userImage}
            alt="user"
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
    </UserDashboardTemplate>
  );
};

export default UserDashboard;
