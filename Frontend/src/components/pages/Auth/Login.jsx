import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../layouts/Layout";

const Login = () => {
  // intitalizing states for each input field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // use navigate hook for changing the location or redirect the user
  const navigate = useNavigate();
  const location = useLocation();

  // handle submit form function
  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      const data = await res.data;

      if (res.data.success) {
        toast.success(res.data.message);

        // // set data in auth context
        // setAuth({
        //   ...auth,
        //   user: res.data.user,
        //   token: res.data.token,
        // });

        // // store data in localStorage
        // localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }

  return (
    <Layout title={"Log In - Deal Daddy"}>
      <div className="mx-auto mt-20 md:w-[600px] text-center">
        {/* form backgournd div */}

        <div className="px-4 md:px-8 py-8 pb-10 bg-white/30 backdrop:blur-sm mx-4 md:mx-0 rounded-2xl border border-gray-500 shadow-lg">
          <h1 className="text-3xl font-medium mb-6 md:mb-4 px-2 py-1 inline-block">
            Log In
          </h1>
          {/* form */}
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 selection:bg-green-400 rounded-lg placeholder:text-sm"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              spellCheck="false"
              required
            />
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 selection:bg-green-400 rounded-lg placeholder:text-sm"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              spellCheck="false"
              required
            />

            <input
              className="bg-slate-900 px-3 py-2 text-white text-lg cursor-pointer hover:text-green-400 rounded-lg"
              type="submit"
              value="Log In"
            />

            {/* forgot password */}
            <Link
              to="/reset-password"
              className="text-lg text-slate-900 hover:scale-105"
            >
              Forgot Password?
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
