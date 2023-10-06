import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = () => {
  return (
    <div>
      <form className="flex gap-0 mr-3 mt-1">
        <input
          className="outline-none px-3 py-2 rounded-l-lg border border-black placeholder:text-gray-500 w-full"
          type="search"
          placeholder="Search product.."
        />
        <button className="px-3 py-1 bg-black text-white cursor-pointer rounded-r-lg pr-4 hover:bg-gray-700">
          <AiOutlineSearch fontSize={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
