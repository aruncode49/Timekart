import React from "react";
import Layout from "../layouts/Layout";
import { useCategory } from "../../hooks/useCategory";
import { Link } from "react-router-dom";

const AllCategories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <h1 className="text-2xl text-center font-medium mt-5">All Categories</h1>
      <div className="flex flex-wrap max-w-[400px] items-center justify-center mx-auto mt-7 gap-x-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.slug}`}
            className="text-lg bg-slate-900 w-fit px-3 py-4 text-white rounded-lg capitalize hover:scale-105 hover:text-green-400 duration-200"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default AllCategories;
