import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: mongoose.model("product"),
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: mongoose.model("user"),
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

export default Order;
