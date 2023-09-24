import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import pagenotfound from "/images/pagenotfound.svg";

const PageNotFound = () => {
  return (
    <Layout title={"404 Page Not Found"}>
      <div className="text-center pb-10 md:pb-20 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <img
          className="w-[400px] mx-auto p-10 "
          src={pagenotfound}
          alt="404 Page Not Found"
        />
        <h1 className="text-3xl md:text-4xl z-10 -mt-14 mb-10 font-medium">
          Oops! Page Not Found
        </h1>
        <Link
          className="text-lg font-medium bg-slate-900 hover:bg-slate-600 text-white px-3 py-2 rounded-lg "
          to="/"
        >
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
