import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CardShimmer from "./CardShimmer";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { priceRange } from "../priceRange";
import ColorRingLoader from "../ColorRingLoader";
import SearchInput from "../forms/SearchInput";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get total products count
  async function getProductsCount() {
    try {
      const { data } = await axios.get("/api/v1/product/total");
      if (data?.success) setTotalProducts(data?.total);
    } catch (error) {
      console.log("Error inside prodcut count function: " + error);
    }
  }

  useEffect(() => {
    getProductsCount();
  }, []);

  // loadmore products
  async function loadMore() {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      if (data?.success) {
        setProducts([...products, ...data?.products]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // loadmore useeffect
  useEffect(() => {
    loadMore();
  }, [page]);

  function handleSideBarToggler() {
    setIsOpen((prev) => !prev);
  }

  // get all products per list page
  async function getAllProducts() {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      if (data?.success) {
        setProducts(data?.products);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(`Error inside get all products: ${error}`);
    }
  }

  // get all products conditionaly
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // get all category function
  async function getAllCategory() {
    try {
      const res = await axios.get("/api/v1/category/allCategories");
      const data = await res.data;

      if (data?.success) {
        setCategories(data.allCategories);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`Error inside get all category function : ${error}`);
    }
  }

  // for fetching category
  useEffect(() => {
    getAllCategory();
  }, []);

  // handle filter function
  function handleFilter(value, categoryId) {
    let categories = [...checked];
    if (value) {
      categories.push(categoryId);
    } else {
      categories = categories.filter((cid) => cid !== categoryId);
    }
    setChecked(categories);
  }

  // get filter products
  async function filtereProduct() {
    setLoading(true);
    setIsOpen(false);
    try {
      const { data } = await axios.post("/api/v1/product/filter", {
        checked,
        radio,
      });

      if (data?.success) {
        setProducts(data?.filterProducts);
        setLoading(false);
      }
    } catch (error) {
      console.log(`Error inside filter product function : ${error}`);
      setLoading(false);
    }
  }
  // get filter products
  useEffect(() => {
    if (checked.length || radio.length) filtereProduct();
  }, [checked.length, radio.length]);

  // for mobile filter panel
  useEffect(() => {
    // Function to check if the screen width is below a certain threshold (e.g., 768px)
    const checkIsMobile = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    // Initially, check the screen size and set the state
    checkIsMobile();

    // Add a listener for window resize events to update the state
    window.addEventListener("resize", checkIsMobile);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <Layout title={"Deal Daddy - Online Shopping Website"}>
      {/* input search */}
      <div className="mx-auto ml-2 md:ml-0 w-full md:px-6 mt-3 py-3">
        <SearchInput />
      </div>

      {/* header div */}
      <div className="flex gap-3 text-lg font-medium mt-3 px-6 w-full">
        <button
          onClick={handleSideBarToggler}
          className="w-[100px] bg-gray-200 rounded-lg flex items-center justify-center gap-2 py-2 px-2"
        >
          {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}Filters
        </button>
        <h1 className="w-full text-center text-xl mt-3">All Products</h1>
      </div>

      {/* container */}
      <div className="px-6 flex gap-4">
        {/* filters section */}
        {isOpen && (
          <section className="flex flex-col absolute md:relative bg-white min-w-[250px] rounded-lg max-h-[80vh] border border-gray-200 mt-5">
            {/* category */}
            <div className="mt-3 p-3 flex flex-col gap-2 w-full">
              <h1 className="font-medium bg-gray-300 px-2 py-1 text-center rounded-md">
                Categories
              </h1>
              {categories?.map((data, index) => (
                <div className="flex justify-start gap-3" key={index}>
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    name={data.name}
                    id={data.name}
                    onChange={(e) => handleFilter(e.target.checked, data._id)}
                  />
                  <label className="cursor-pointer" htmlFor={data.name}>
                    {data.name}
                  </label>
                </div>
              ))}
            </div>

            {/* Price range */}
            <div className="p-3 flex flex-col gap-2 w-full">
              <h1 className="font-medium bg-gray-300 px-2 py-1 text-center rounded-md">
                Price Range
              </h1>
              {priceRange?.map(({ name, id, range }) => (
                <div className="flex justify-start gap-3" key={id}>
                  <input
                    className="cursor-pointer"
                    type="radio"
                    name={"priceRange"}
                    value={JSON.stringify(range)}
                    id={name}
                    onChange={(e) => setRadio(JSON.parse(e.target.value))}
                  />
                  <label className="cursor-pointer" htmlFor={name}>
                    {name}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-3 mb-10 mx-4 rounded-lg hover:bg-red-600 text-center bg-red-500 text-white">
              <button
                onClick={(e) => window.location.reload()}
                className="w-full px-2 py-1 "
              >
                RESET FILTERS
              </button>
            </div>
          </section>
        )}

        {loading ? (
          <ColorRingLoader />
        ) : (
          <>
            {/* all products section */}
            {products.length === 0 ? (
              <CardShimmer />
            ) : (
              <section className="mt-5 w-full">
                <div className="flex flex-wrap gap-4 gap-y-6 justify-center">
                  {products.map(({ name, slug, description, _id, price }) => (
                    // product card
                    <div
                      className="w-[350px] md:w-[250px] p-3 border border-gray-300 rounded-xl"
                      key={_id}
                    >
                      <Link>
                        <img
                          className="h-[200px] mx-auto rounded-xl"
                          src={`/api/v1/product/image/${_id}`}
                          alt={name}
                        />
                        <h1 className=" font-medium mt-2 line-clamp-1">
                          {name}
                        </h1>
                        <p className="mt-1 text-gray-500 line-clamp-2 text-sm">
                          {description}
                        </p>
                      </Link>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="font-medium text-green-700">₹{price}</p>
                        <button
                          onClick={() => alert("hello")}
                          className="bg-yellow-400 hover:scale-105 hover:bg-yellow-500 duration-200 border border-gray-400 px-2 py-1 rounded-lg font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
      {/* Loader */}
      {products && products.length < totalProducts && (
        <div className="mx-auto text-white px-3 py-2 rounded-lg font-medium hover:bg-green-700 hover:scale-105 duration-200 text-lg mt-12 bg-green-600 w-fit">
          <button
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            Load More
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Home;
