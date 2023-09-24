import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../layouts/Layout";

const Login = () => {
  // intitalizing states for each input field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // use navigate hook for changing the location or redirect the user
  const navigate = useNavigate();

  // handle submit form function
  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
        email,
        password,
      });

      const data = await res.data;

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }

  return (
    <Layout>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[600px]">
        {/* form backgournd div */}
        <div className="px-8">
          {/* form */}
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
            <input
              className="px-3 py-2 border-2 border-slate-900 outline-none placeholder:text-slate-900 selection:bg-green-400"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              spellCheck="false"
              required
            />
            <input
              className="px-3 py-2 border-2 border-slate-900 outline-none placeholder:text-slate-900 selection:bg-green-400"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              spellCheck="false"
              required
            />

            <input
              className="bg-slate-900 px-3 py-2 text-white text-lg cursor-pointer hover:text-green-400"
              type="submit"
              value="Register"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
