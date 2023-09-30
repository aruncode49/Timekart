import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminDashboardTemplate from "./AdminDashboardTemplate";
import CreateCategoryForm from "../forms/CreateCategoryForm";

const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  // get all category function
  async function getAllCategory() {
    try {
      const res = await axios.get("/api/v1/category/allCategories");
      const data = await res.data;

      if (data?.success) {
        setCategory(data.allCategories);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`Error inside get all category function : ${error}`);
    }
  }

  // create new category function
  async function createNewCategory(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create", { name });
      if (data?.success) {
        toast.success(data.message);
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`Error inside create new category function : ${error}`);
    }
  }

  // delete category
  async function deleteCategory(e, cid) {
    e.preventDefault();

    try {
      const { data } = await axios.delete(`/api/v1/category/${cid}`);
      if (data?.success) {
        toast.success("Category Deleted Successfully");
        getAllCategory();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(`Error inside delete category function : ${error}`);
    }
  }

  // update category
  async function updateCategory(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update/${categoryId}`,
        {
          name: updateCategoryName,
        }
      );
      if (data?.success) {
        toast.success("Category Updated Successfully");
        getAllCategory();
        setCategoryId(null);
        setIsModalOpen(false);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(`Error inside update category function : ${error}`);
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
        <div className="mt-4 mb-6">
          <CreateCategoryForm
            name={name}
            setName={setName}
            handleCreateCategorySubmit={createNewCategory}
            placeholder={"Enter new category"}
            buttonName={"New"}
          />
        </div>

        {/* Category Table */}

        <div>
          {category &&
            category.map((data, index) => {
              return (
                <div
                  key={data._id}
                  className="flex justify-between rounded-lg bg-gray-200 px-4 md:px-4 py-3 mt-4"
                >
                  <div className="flex px-1 gap-2 items-center md:text-lg font-medium uppercase">
                    <h1>{index + 1}.</h1>
                    <h1>{data.name}</h1>
                  </div>

                  <div className="flex gap-5 md:gap-10">
                    <button
                      onClick={(e) => {
                        setIsModalOpen(true);
                        setUpdateCategoryName(data.name);
                        setCategoryId(data._id);
                      }}
                      className="px-2 py-1 bg-slate-900 text-white rounded-md hover:text-green-400 h-8"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => deleteCategory(e, data._id)}
                      className="px-2 py-1 bg-slate-900 text-white rounded-md hover:text-green-400 h-8"
                    >
                      Delete
                    </button>
                  </div>

                  {/* modal */}
                </div>
              );
            })}

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white w-[360px] p-5  h-36  border border-gray-400 rounded-xl shadow-lg">
              <CreateCategoryForm
                buttonName={"Update"}
                name={updateCategoryName}
                setName={setUpdateCategoryName}
                handleCreateCategorySubmit={updateCategory}
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute bottom-4 bg-red-600 px-2 py-1 rounded-lg text-white w-[300px] mx-auto hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default CreateCategory;
