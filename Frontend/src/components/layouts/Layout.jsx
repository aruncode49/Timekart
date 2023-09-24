import React from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <div>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
      </div>

      <Header />
      <div className="bg-[#FFF5E0]">
        <main className="relative max-w-screen-lg mx-auto px-4 min-h-[70vh] overflow-hidden">
          <Toaster />
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Deal Daddy - Online Shopping Website",
  description:
    "A full stack ecommerce app project created using mongodb, express js, react js and node js.",
  keywords:
    "arunkumar, dealdaddy, deal daddy, deal daddy website, ecommerce app, ecommerce project, mern stack project, mernapp, mongodb, reactjs, nodejs, expressjs arunkumarprojects",
  author: "Arun Kumar",
};

export default Layout;
