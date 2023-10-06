import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearch } from "../../context/SearchContext";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios(`/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data.searchProducts });
      navigate("/search");
    } catch (error) {
      console.log(`Error inside searchinput ${error}`);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-0 mr-3 mt-1">
        <input
          className="outline-none px-3 py-2 rounded-l-lg border border-black placeholder:text-gray-500 w-full"
          type="search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
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
