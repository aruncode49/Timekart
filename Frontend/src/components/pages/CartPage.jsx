import React from "react";
import Layout from "../layouts/Layout";
import useAuth from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cartItem, setCartItem] = useCart();

  // REMOVE ITEM FROM CART
  function removeItem(pid) {
    try {
      const products = cartItem?.filter((product) => product._id !== pid);
      setCartItem(products);
      localStorage.setItem("cart", JSON.stringify(products));
      toast.success("Item removed successfully!");
    } catch (error) {
      console.log(error);
    }
  }

  // COUNT PRICE FOR TOTAL PRODUCTS
  function countPrice() {
    let totalPrice = 0;
    cartItem?.map((product) => {
      totalPrice += product.price;
    });
    return totalPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  }

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
                    <button
                      onClick={() => removeItem(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md mt-3 mb-2 text-sm hover:bg-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* cart summary */}
            <div className="basis-[40%] text-center">
              <h1 className="text-2xl font-medium mt-4">Cart Summary</h1>
              <p className="text-lg mt-2 text-gray-600 pb-4 border-b">
                Total | Checkout | Payment
              </p>
              <h1 className="mt-3 text-xl text-gray-500 border-2 border-gray-400 w-fit mx-auto px-2 py-1 rounded-lg">
                Total: {countPrice()}
              </h1>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
