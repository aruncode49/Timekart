import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminDashboardTemplate from "./AdminDashboardTemplate";
import CreateCategoryForm from "../forms/CreateCategoryForm";

const CreateCategory = () => {
  const [category, setCategory] = useState("");

  // get all category function
  async function getAllCategory() {
    try {
      const res = await axios.get("/api/v1/category/allCategories");
      const data = await res.data;

      if (data?.success) {
        setCategory(data.allCategories);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`Error inside get all category function : ${error}`);
    }
  }

  // call get All category function
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <AdminDashboardTemplate title={"Create New Category - Deal Daddy"}>
      <div className="w-full">
        <h1 className="text-2xl mt-2 font-medium">Manage Category</h1>

        {/* create category form */}
        <div className="mt-4">
          <CreateCategoryForm />
        </div>

        {/* Category Table */}

        <>
          {category &&
            category.map((data, index) => {
              return (
                <div
                  key={data._id}
                  className="flex justify-between rounded-lg bg-gray-200 px-4 md:px-4 py-3 mt-4"
                >
                  <div className="flex gap-2 items-center text-lg font-medium">
                    <h1>{index + 1}.</h1>
                    <h1>{data.name}</h1>
                  </div>

                  <div className="flex gap-5 md:gap-10">
                    <button className="px-2 py-1 bg-slate-900 text-white rounded-md hover:text-green-400">
                      Edit
                    </button>
                    <button className="px-2 py-1 bg-slate-900 text-white rounded-md hover:text-green-400">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </>
      </div>
    </AdminDashboardTemplate>
  );
};

export default CreateCategory;
