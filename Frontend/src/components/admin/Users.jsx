import React, { useState, useEffect } from "react";
import AdminDashboardTemplate from "./AdminDashboardTemplate";
import axios from "axios";
import ColorRingLoader from "../ColorRingLoader";
import UserImage from "/images/user.png";

const Users = () => {
  const [users, setUsers] = useState([]);

  // get all users function
  async function getAllUsers() {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users");
      if (data?.success) {
        setUsers(data?.allUsers);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <AdminDashboardTemplate title={"All Users - Timekart"}>
      <div className="w-full">
        <h1 className="text-2xl mt-2 font-medium text-center">All Users</h1>
        {/* display all users */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {!users ? (
            <ColorRingLoader />
          ) : (
            users?.map(({ name, email, address, phone, _id }) => {
              return (
                <div
                  key={_id}
                  className="text-sm flex flex-col gap-2 text-center p-2 border border-gray-500 rounded-lg"
                >
                  <img
                    className="w-16 mx-auto"
                    src={UserImage}
                    alt="User image"
                  />
                  <p className="text-gray-500 capitalize">Name: {name}</p>
                  <p className="text-gray-500">Email: {email}</p>
                  <p className="text-gray-500">Phone: {phone}</p>
                  <p className="line-clamp-1 text-gray-500">
                    Address: {address}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default Users;
