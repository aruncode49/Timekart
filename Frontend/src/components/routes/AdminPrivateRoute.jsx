import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../context/AuthContext";

const AdminPrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://timekart-backend.onrender.com/api/v1/auth/admin-auth"
      );

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
        toast.error("Unauthorized Access");
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminPrivateRoute;
