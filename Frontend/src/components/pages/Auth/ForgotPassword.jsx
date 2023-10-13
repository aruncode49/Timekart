import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../layouts/Layout";

const Register = () => {
  // intitalizing states for each input field

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  // use navigate hook for changing the location or redirect the user
  const navigate = useNavigate();

  // handle submit form function
  async function resetPassword(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://timekart-backend.onrender.com/api/v1/auth/reset-password",
        {
          email,
          newPassword,
          answer,
        }
      );

      const data = await res.data;

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }

  return (
    <Layout title={"Reset Password - Timekart"}>
      <div className="mx-auto mt-20 w-full md:w-[600px] text-center">
        {/* form backgournd div */}
        <div className="px-4 md:px-8 py-8 pb-10 bg-white/30 backdrop:blur-sm mx-4 md:mx-0 rounded-2xl border border-gray-500 shadow-lg">
          <h1 className="text-3xl font-medium mb-6 md:mb-4 px-2 py-1 inline-block">
            Reset Password
          </h1>
          {/* form */}
          <form onSubmit={resetPassword} className="flex flex-col gap-6">
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              spellCheck="false"
              required
            />
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="text"
              name="answer"
              placeholder="Enter your favourite sports name"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              spellCheck="false"
              autoComplete="off"
              required
            />
            <input
              className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              spellCheck="false"
              required
            />

            <input
              className="bg-slate-900 px-3 py-2 text-white text-lg cursor-pointer rounded-lg hover:text-green-400"
              type="submit"
              value="Reset Password"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
