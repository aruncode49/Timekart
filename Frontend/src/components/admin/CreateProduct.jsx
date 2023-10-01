import React from "react";
import AdminDashboardTemplate from "./AdminDashboardTemplate";
import CreateProductForm from "../forms/CreateProductForm";

const CreateProduct = () => {
  return (
    <AdminDashboardTemplate title={"Create New Product - Deal Daddy"}>
      <div className="w-full">
        <h1 className="text-2xl mt-2 font-medium text-center">
          Create Product
        </h1>
        <div className="mt-5">
          <CreateProductForm />
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default CreateProduct;
