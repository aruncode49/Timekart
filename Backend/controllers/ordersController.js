import Order from "../models/ordersModel.js";

//get all orders controller
export const userOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.userId })
      .populate("products", "-photo")
      .populate("buyer", "name");

    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(`Error insdie userOrdersController: ${error}`);
  }
};
