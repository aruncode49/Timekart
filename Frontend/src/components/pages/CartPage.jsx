import React from "react";
import Layout from "../layouts/Layout";
import useAuth from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cartItem, setCartItem] = useCart();

  return (
    <Layout>
      {!auth?.user ? (
        <h1 className="text-4xl text-center font-medium mt-20 p-3">
          Please Login to checkout Cart!
        </h1>
      ) : (
        <div className="max-w-[1100px] mx-auto">
          {/* cart header */}
          <h1 className="text-2xl text-center font-medium mt-4">
            Hello {auth?.user.name}
          </h1>
          <p className="text-lg mt-2 text-center">
            {cartItem?.length < 1
              ? "Your cart is empty!"
              : `You have ${cartItem?.length} items in your cart`}
          </p>

          {/* cart container div */}
          <div className="flex md:flex-row flex-col gap-4">
            {/* products */}
            <div className="basis-[60%]">
              {cartItem?.map((product) => (
                <div
                  key={product._id}
                  className="flex border mt-4 shadow-md border-gray-400 gap-x-6 bg-gray-100 rounded-lg items-center p-2"
                >
                  <div className="">
                    <img
                      className="max-w-[70px] rounded-lg"
                      src={`/api/v1/product/image/${product._id}`}
                      alt={`${product.name} image`}
                    />
                  </div>
                  <div className="mt-2">
                    <h1 className="line-clamp-1 text-start font-medium text-gray-700">
                      {product.name}
                    </h1>
                    <p className="line-clamp-1 text-start text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-start">
                      Price:{" "}
                      <span className="font-medium text-green-700">
                        ₹{product.price}
                      </span>
                    </p>
                    <button className="bg-red-500 text-white p-1 rounded-md mt-2 text-sm hover:bg-red-400">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* cart summary */}
            <div className="basis-[40%]">
              <h1>Cart Summary</h1>
              <p>Total | Checkout | Payment</p>
              <h1>Total: 23</h1>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
