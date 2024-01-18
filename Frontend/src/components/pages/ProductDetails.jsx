import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [similarProducts, setSimilarProducts] = useState();
  const params = useParams();

  // use cart
  const [cartItem, setCartItem] = useCart();

  // add item to cart
  function addItemToCart(product) {
    setCartItem([...cartItem, product]);
    toast.success("Item added to cart");
    localStorage.setItem("cart", JSON.stringify([...cartItem, product]));
  }

  async function getProductDetails() {
    try {
      const { data } = await axios.get(`/api/v1/product/${params.slug}`);
      if (data?.success) {
        setProduct(data?.product);
        getSimilarProducts(data?.product?._id, data?.product?.category?._id);
      }
    } catch (error) {}
  }

  //   get similar products
  async function getSimilarProducts(pid, cid) {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-products/${pid}/${cid}`
      );
      if (data?.success) {
        setSimilarProducts(data.products);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getProductDetails();
    window.scrollTo(0, 0);
  }, [params.slug]);

  return (
    <Layout title={"Product Details - Timekart"}>
      <div className="mt-3 max-w-[900px] mx-auto">
        <h1 className="text-center text-2xl font-medium">ProductDetails</h1>
        {product && (
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:gap-10 mt-4 ">
            {/* image */}
            <div className=" p-6 rounded-lg relative">
              <img
                className="max-w-[250px] rounded-lg"
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
                onClick={() => addItemToCart(product)}
                className="bg-yellow-400 hover:scale-105 hover:bg-yellow-500 duration-200 border border-gray-400 px-2 py-1 rounded-lg font-medium w-full md:w-[500px]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>

      {similarProducts?.length < 1 ? (
        <h1 className="text-center mt-8 text-red-600">
          No Similar Product Found
        </h1>
      ) : (
        <section className="mt-8 w-full">
          <h1 className="text-2xl font-medium text-center ">
            Similar Products
          </h1>
          <div className="flex flex-wrap gap-4 gap-y-6 justify-center mt-4">
            {similarProducts?.map((p) => (
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
      )}
    </Layout>
  );
};

export default ProductDetails;
