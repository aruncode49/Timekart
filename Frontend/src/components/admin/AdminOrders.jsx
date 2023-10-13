import React, { useState, useEffect } from "react";
import AdminDashboardTemplate from "./AdminDashboardTemplate";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import useAuth from "../../context/AuthContext";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  // get all orders
  async function getAllOrders() {
    try {
      const { data } = await axios.get(
        "http://timekart-backend.onrender.com/api/v1/order/all-orders"
      );
      if (data?.success) {
        setOrders(data?.allOrders);
      }
    } catch (error) {}
  }

  // change status
  async function handleStatusChange(orderId, value) {
    try {
      const { data } = await axios.put(
        `http://timekart-backend.onrender.com/api/v1/order/change-status/${orderId}`,
        {
          status: value,
        }
      );
      if (data?.success) {
        toast.success(data?.message);
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (auth?.user) getAllOrders();
  }, []);

  return (
    <AdminDashboardTemplate title={"Manage Orders - Timekart"}>
      <div className="w-full">
        <h1 className="text-2xl mt-2 font-medium text-center">Manage Orders</h1>

        {orders?.length < 1 ? (
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
                      <td>
                        <select
                          name="status"
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          defaultValue={order?.status}
                          className="outline-none"
                        >
                          {status?.map((s, i) => (
                            <option key={i} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
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
                        src={`http://timekart-backend.onrender.com/api/v1/product/image/${product._id}`}
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
    </AdminDashboardTemplate>
  );
};

export default AdminOrders;
