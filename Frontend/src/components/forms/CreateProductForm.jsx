import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  // first get all categories
  async function getAllCategory() {
    try {
      const res = await axios.get(
        "https://timekart-backend.onrender.com/api/v1/category/allCategories"
      );
      const data = await res.data;

      if (data?.success) {
        setCategories(data.allCategories);
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  }

  //   handle create product function
  async function handleCreateProduct(e) {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("category", category);
    productData.append("quantity", quantity);
    productData.append("shipping", shipping);
    productData.append("photo", photo);

    try {
      const { data } = await axios.post(
        "https://timekart-backend.onrender.com/api/v1/product/create",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="w-full md:w-[600px] mx-auto">
      <div className="px-3 md:px-8 py-8 pb-10 bg-white/30 backdrop:blur-sm rounded-2xl border border-gray-500 shadow-lg">
        <form onSubmit={handleCreateProduct} className="flex flex-col gap-6 ">
          {/* name */}
          <input
            className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            spellCheck="false"
            required
          />
          {/* description */}
          <textarea
            className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            spellCheck="false"
            required
          />
          {/* price */}
          <input
            className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
            type="number"
            value={price}
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price in (₹)"
            spellCheck="false"
            required
          />
          {/* category */}
          <select
            className="px-3 py-2 border border-slate-900 outline-none text-sm rounded-lg"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            name="category"
          >
            <option value="" disabled hidden>
              Select product category
            </option>
            {categories &&
              categories.map((category, index) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
          </select>

          {/* quantity */}
          <input
            className="px-3 py-2 border border-slate-900 outline-none placeholder:text-slate-900 rounded-lg selection:bg-green-400 placeholder:text-sm"
            type="number"
            value={quantity}
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter product quantity"
            spellCheck="false"
            required
          />
          {/* Shipping */}
          <select
            className="px-3 py-2 border border-slate-900 outline-none text-sm rounded-lg"
            onChange={(e) => setShipping(e.target.value)}
            value={shipping}
            name="shipping"
          >
            <option value="" disabled hidden>
              Select product shipping
            </option>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>

          <input
            className="px-3 py-2 border border-slate-900 outline-none rounded-lg cursor-pointer"
            type="file"
            id="uploadImage"
            name="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            placeholder="Select product image"
            spellCheck="false"
            required
          />

          {photo && (
            <>
              <div>
                <img
                  className="h-36 mx-auto"
                  src={URL.createObjectURL(photo)}
                  alt="Product Image"
                />
              </div>
            </>
          )}

          <button
            className="bg-slate-900 px-3 py-2 text-white text-lg cursor-pointer rounded-lg hover:text-green-400"
            type="submit"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
