import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import { Circles } from "react-loader-spinner";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);

    if (count === 0) {
      toast.error("Please login to proceed!");
      navigate("/login", { state: location.pathname });
    }
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <Layout>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </Layout>
  );
};

export default Spinner;
