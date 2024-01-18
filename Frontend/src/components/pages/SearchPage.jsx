import React from "react";
import Layout from "../layouts/Layout";
import { useSearch } from "../../context/SearchContext";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

const SearchPage = () => {
  const [values, setValues] = useSearch();
  // use cart
  const [cartItem, setCartItem] = useCart();

  function addItemToCart(product) {
    setCartItem([...cartItem, product]);
    toast.success("Item added to cart");
    localStorage.setItem("cart", JSON.stringify([...cartItem, product]));
  }
  return (
    <Layout title={"Search Products - Timekart"}>
      <div className="mx-auto text-center">
        <h1 className="text-2xl font-medium mt-2">Search Results</h1>
        <h3 className="mt-2">
          {values?.results.length < 1
            ? "No Product Found"
            : `Found ${values?.results?.length} Product`}
        </h3>
        <section className="mt-5 w-full">
          <div className="flex flex-wrap gap-4 gap-y-6 justify-center">
            {values?.results.map((p) => (
              // product card
              <div
                className="w-[350px] md:w-[250px] p-3 border border-gray-300 rounded-xl"
                key={p._id}
              >
                <Link to={`/product/${p.slug}`}>
                  <img
                    className="h-[200px] mx-auto rounded-xl"
                    src={`/api/v1/product/image/${p._id}`}
                    alt={p.name}
                  />
                  <h1 className=" font-medium mt-2 line-clamp-1">{p.name}</h1>
                  <p className="mt-1 text-gray-500 line-clamp-2 text-sm">
                    {p.description}
                  </p>
                </Link>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-medium text-green-700">₹{p.price}</p>
                  <button
                    onClick={() => addItemToCart(p)}
                    className="bg-yellow-400 hover:scale-105 hover:bg-yellow-500 duration-200 border border-gray-400 px-2 py-1 rounded-lg font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SearchPage;
