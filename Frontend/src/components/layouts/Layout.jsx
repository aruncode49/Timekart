import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />

      <main className="max-w-screen-lg mx-auto px-4 min-h-[70vh] overflow-hidden">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
