import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const params = useParams();

  async function getProductDetails() {
    try {
      const { data } = await axios.get(`/api/v1/product/${params.slug}`);
      if (data?.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.log(`Error inside product details : ${error}`);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [params.slug]);

  return (
    <Layout>
      <div className="mt-3 max-w-[900px] mx-auto">
        <h1 className="text-center text-2xl font-medium">ProductDetails</h1>
        {product && (
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:gap-10 mt-10 ">
            {/* image */}
            <div className=" p-6 rounded-lg relative">
              <img
                className="max-w-[250px]"
                src={`/api/v1/product/image/${product._id}`}
                alt=""
              />
            </div>
            <div className="mt-8 flex flex-col md:gap-5 gap-3">
              <h1 className="text-lg font-medium">{product.name}</h1>
              <p className="text-gray-500">{product.description}</p>
              <p className="capitalize text-gray-500">
                Category: {product.category.name}
              </p>
              <p className="text-gray-500">
                Price:{" "}
                <span className="text-green-600 font-medium">
                  ₹{product.price}
                </span>
              </p>
              <button
                onClick={() => alert("hello")}
                className="bg-yellow-400 hover:scale-105 hover:bg-yellow-500 duration-200 border border-gray-400 px-2 py-1 rounded-lg font-medium w-full md:w-[500px]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
