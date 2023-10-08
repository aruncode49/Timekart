import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useCategory();

  function handleSideBarToggler() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div>
      <div
        onClick={handleSideBarToggler}
        className="flex items-center justify-center gap-1 font-medium text-lg py-2 cursor-pointer mx-2 hover:text-green-400"
      >
        Category
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </div>
      {/* Side Menu */}
      {isOpen && (
        <div className="shadow-lg absolute px-2 py-2 rounded-lg text-black bg-white flex flex-col">
          <Link
            to={"/all-categories"}
            className="py-2 px-2 hover:bg-gray-100 cursor-pointer"
          >
            All Categories
          </Link>
          {categories &&
            categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.slug}`}
                className=" py-2 px-2 cursor-pointer hover:bg-gray-100 capitalize"
              >
                {category.name}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Category;
