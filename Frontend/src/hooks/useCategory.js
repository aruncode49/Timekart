import { useState, useEffect } from "react";
import axios from "axios";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);

  // get all categories
  async function getCategories() {
    try {
      const { data } = await axios.get("api/v1/category/allCategories");
      if (data?.success) {
        setCategories(data.allCategories);
      }
    } catch (error) {
      console.log(`Error inside useCategory : ${error}`);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};
