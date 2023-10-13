import React from "react";
import AdminDashboardTemplate from "./AdminDashboardTemplate";
import UpdateProductForm from "../forms/UpdateProductForm";

const UpdateProduct = () => {
  return (
    <AdminDashboardTemplate title={"Update Product - Timekart"}>
      <div className="w-full">
        <h1 className="text-2xl mt-2 font-medium text-center">
          Update Product
        </h1>
        <div className="mt-5">
          <UpdateProductForm />
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default UpdateProduct;
