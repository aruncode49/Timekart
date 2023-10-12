import Order from "../models/ordersModel.js";

//get user orders controller
export const userOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.userId })
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(`Error insdie userOrdersController: ${error}`);
  }
};

// get all orders for admin controller
export const allOrdersController = async (req, res) => {
  try {
    const allOrders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      allOrders,
    });
  } catch (error) {
    console.log(`Error insdie allOrdersController: ${error}`);
  }
};

// change order status controller
export const changeOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).send({
      success: true,
      message: "Status Changed Successfully",
    });
  } catch (error) {
    console.log(`Error insdie changeOrderStatusController: ${error}`);
  }
};
