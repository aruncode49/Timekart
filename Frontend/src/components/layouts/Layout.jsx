import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <Header />

      <main className="min-h-[80vh]">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
