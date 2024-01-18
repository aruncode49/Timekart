import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const [password, setPassword] = useState("");

  // navigate variable
  const navigate = useNavigate();

  // handle user profile update form
  async function handleProfileUpdateSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/update-profile", {
        name,
        email,
        phone,
        password,
        address,
      });

      if (data?.success) {
        setAuth({
          ...auth,
          user: data.updatedUser,
        });
        let storageData = localStorage.getItem("auth");
        storageData = JSON.parse(storageData);
        storageData.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(storageData));
        navigate("/dashboard/user");
        toast.success(data?.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }

  useEffect(() => {
    if (auth?.user) {
      const { name, email, phone, address, password } = auth?.user;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, [auth?.user]);

  return (
    <UserDashboardTemplate title={"User Profile - Timekart"}>
      <div className="mx-auto mt-8 w-full md:w-[600px] text-center">
        {/* form backgournd div */}
        <div className="px-4 md:px-8 py-8 pb-10 bg-white/30 backdrop:blur-sm mx-4 md:mx-0 rounded-2xl border border-gray-500 shadow-lg">
          <h1 className="text-3xl font-medium mb-6 md:mb-4 px-2 py-1 inline-block">
            Update Profile
          </h1>
          {/* form */}
          <form
            onSubmit={handleProfileUpdateSubmit}
            className="flex flex-col gap-5"
          >
            <label className="text-start text-lg -mb-5 px-1 font-medium">
              Name
            </label>
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="text"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              spellCheck="false"
            />
            <label className="text-start text-lg -mb-5 px-1 font-medium ">
              Email
            </label>
            <input
              className="px-3 py-2 border border-slate-900 bg-gray-100 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              spellCheck="false"
              disabled
            />
            <label className="text-start text-lg -mb-5 px-1 font-medium ">
              Phone No.
            </label>
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="text"
              name="phone"
              value={phone}
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
              spellCheck="false"
            />
            <label className="text-start text-lg -mb-5 px-1 font-medium ">
              Address
            </label>
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="text"
              name="address"
              value={address}
              placeholder="Enter your current address"
              onChange={(e) => setAddress(e.target.value)}
              spellCheck="false"
            />
            <label className="text-start text-lg -mb-5 px-1 font-medium ">
              Password (optional)
            </label>
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="password"
              name="password"
              value={password}
              placeholder="Update password, if you want!"
              onChange={(e) => setPassword(e.target.value)}
              spellCheck="false"
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
