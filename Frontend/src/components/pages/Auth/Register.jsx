import React, { useState } from "react";
import Layout from "../../layouts/Layout";

const Register = () => {
  // intitalizing states for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // handle submit form function
  function handleRegistrationSubmit(e) {
    e.preventDefault();
    console.log(name, email, phone, password);
  }

  return (
    <Layout>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[600px]">
        {/* form backgournd div */}
        <div className="px-8">
          {/* form */}
          <form
            action=""
            onSubmit={handleRegistrationSubmit}
            className="flex flex-col gap-6"
          >
            <input
              className="px-3 py-2 border-2 border-slate-900 outline-none placeholder:text-slate-900 selection:bg-green-400"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              spellCheck="false"
              required
            />
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
              type="text"
              name="phone"
              placeholder="Enter your phone no."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

export default Register;
