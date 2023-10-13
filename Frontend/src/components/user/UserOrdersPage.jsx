import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import UserDashboardTemplate from "./UserDashboardTemplate";
import useAuth from "../../context/AuthContext";

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  async function getAllOrders() {
    try {
      const { data } = await axios.get("/api/v1/order/user-orders");
      if (data?.success) {
        setOrders(data?.orders);
      }
    } catch (error) {
      console.log(`Error inside get all order function : ${error}`);
    }
  }

  useEffect(() => {
    if (auth?.user) getAllOrders();
  }, []);

  return (
    <UserDashboardTemplate title={"User Orders - Timekart"}>
      <div className="w-full">
        <h1 className="text-2xl mt-2 font-medium text-center">Your Orders</h1>

        {orders.length < 1 ? (
          <p className="text-center mt-4 text-red-500">No orders to display.</p>
        ) : (
          <>
            {orders?.map((order, index) => (
              <div key={index}>
                <table className="w-full border border-black mt-6">
                  <thead>
                    <tr className="text-center bg-yellow-300 text-sm font-normal">
                      <th className="py-3">P.No.</th>
                      <th>Status</th>
                      <th>Buyer</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center text-sm">
                      <td className="py-3">{index + 1}</td>
                      <td>{order?.status}</td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createdAt).fromNow()}</td>
                      <td>{order?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>

                {order?.products?.map((product) => (
                  <div
                    key={product._id}
                    className="flex border mt-6 shadow-md border-gray-400 gap-x-6 bg-gray-100 rounded-lg items-center p-2"
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
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </UserDashboardTemplate>
  );
};

export default UserOrdersPage;
