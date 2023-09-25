import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../layouts/Layout";

const Register = () => {
  // intitalizing states for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // use navigate hook for changing the location or redirect the user
  const navigate = useNavigate();

  // handle submit form function
  async function handleRegistrationSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        phone,
        password,
      });

      const data = await res.data;

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
      console.log(`Registration Response Successfull : ${data}`);
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.log(`Error inside handleRegistration: ${error}`);
    }
  }

  return (
    <Layout title={"Create Account - Deal Daddy"}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[600px] text-center">
        {/* form backgournd div */}
        <div className="px-4 md:px-8 py-8 pb-10 bg-white/50 backdrop:blur-sm mx-4 md:mx-0 rounded-2xl border-2 border-slate-900 shadow-lg">
          <h1 className="text-3xl font-medium mb-6 md:mb-4 px-2 py-1 inline-block">
            Create Account
          </h1>
          {/* form */}
          <form
            onSubmit={handleRegistrationSubmit}
            className="flex flex-col gap-6"
          >
            <input
              className="px-3 py-2 border-2 border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              spellCheck="false"
              required
            />
            <input
              className="px-3 py-2 border-2 border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              spellCheck="false"
              required
            />
            <input
              className="px-3 py-2 border-2 border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400"
              type="text"
              name="phone"
              placeholder="Enter your phone no."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              spellCheck="false"
              required
            />
            <input
              className="px-3 py-2 border-2 border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              spellCheck="false"
              required
            />

            <input
              className="bg-slate-900 px-3 py-2 text-white text-lg cursor-pointer rounded-lg hover:text-green-400"
              type="submit"
              value="Register"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
