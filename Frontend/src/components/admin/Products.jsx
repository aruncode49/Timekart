import React, { useState, useEffect } from "react";
import AdminDashboardTemplate from "./AdminDashboardTemplate";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  async function getAllProducts() {
    try {
      const { data } = await axios.get("/api/v1/product/allProducts");
      if (data?.success) {
        setProducts(data?.allProducts);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(`Error inside get all products: ${error}`);
    }
  }

  // delete product
  async function deleteProduct(e, pid) {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/api/v1/product/${pid}`);
      if (data?.success) {
        toast.success(data?.message);
        getAllProducts();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(`Error inside delete products: ${error}`);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <AdminDashboardTemplate title={"Manage Products - Deal Daddy"}>
        <div className="w-full">
          <h1 className="text-2xl mt-2 font-medium text-center">
            All Products
          </h1>
          <div className="mt-5">
            {/* All Products */}
            {!products ? (
              <Spinner />
            ) : (
              <div className="flex flex-wrap gap-x-5 gap-y-6 cursor-pointer justify-center p-4">
                {products.map(({ name, slug, description, _id }) => (
                  // product card
                  <div
                    className="w-[350px] md:w-[300px] p-3 border border-gray-300 rounded-xl"
                    key={_id}
                  >
                    <img
                      className="h-[200px] mx-auto rounded-xl"
                      src={`/api/v1/product/image/${_id}`}
                      alt={name}
                    />
                    <h1 className="text-lg font-medium mt-2">{name}</h1>
                    <p className="mt-2 text-gray-500 line-clamp-2">
                      {description}
                    </p>
                    <div className="flex mt-2 items-center gap-4">
                      <Link
                        to={`/dashboard/admin/product/${slug}`}
                        className="bg-green-200 p-2 rounded-lg text-sm hover:scale-105 hover:bg-green-300 duration-200"
                      >
                        Update
                      </Link>
                      <button
                        onClick={(e) => deleteProduct(e, _id)}
                        className="bg-red-200 p-2 rounded-lg text-sm hover:scale-105 hover:bg-red-300 duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AdminDashboardTemplate>
    </div>
  );
};

export default Products;
