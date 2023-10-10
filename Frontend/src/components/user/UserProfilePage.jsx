import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../context/AuthContext";
import UserDashboardTemplate from "./UserDashboardTemplate";

const UserProfilePage = () => {
  // context
  const [auth, setAuth] = useAuth();

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // handle user profile update form
  // async function handleProfileUpdateSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("/api/v1/auth/register", {
  //       name,
  //       email,
  //       phone,
  //       password,
  //     });

  //     const data = await res.data;

  //     if (res.data.success) {
  //       toast.success(res.data.message);
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Something Went Wrong!");
  //     console.log(`Error inside handleProfileUpdateSubmit: ${error}`);
  //   }
  // }

  useEffect(() => {
    if (auth?.user) {
      const { name, email, phone, address } = auth?.user;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, []);

  return (
    <UserDashboardTemplate title={"User Profile - Deal Daddy"}>
      <div className="mx-auto mt-8 w-full md:w-[600px] text-center">
        {/* form backgournd div */}
        <div className="px-4 md:px-8 py-8 pb-10 bg-white/30 backdrop:blur-sm mx-4 md:mx-0 rounded-2xl border border-gray-500 shadow-lg">
          <h1 className="text-3xl font-medium mb-6 md:mb-4 px-2 py-1 inline-block">
            Update Profile
          </h1>
          {/* form */}
          <form
            // onSubmit={handleRegistrationSubmit}
            className="flex flex-col gap-6"
          >
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              spellCheck="false"
              required
            />
            <input
              className="px-3 py-2 border border-slate-900 bg-gray-100 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              spellCheck="false"
              required
              disabled
            />
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              spellCheck="false"
              required
            />
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              spellCheck="false"
              required
            />

            <input
              className="bg-slate-900 px-3 py-2 text-white text-lg cursor-pointer rounded-lg hover:text-green-400"
              type="submit"
              value="Update"
            />
          </form>
        </div>
      </div>
    </UserDashboardTemplate>
  );
};

export default UserProfilePage;
