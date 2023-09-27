import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import Spinner from "../Spinner";
import axios from "axios";
import toast from "react-hot-toast";

const AdminPrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [cookies] = useCookies("token");
  const token = cookies.token;

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/admin-auth");

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
        toast.error("Unauthorized Access");
      }
    };

    if (token) authCheck();
  }, [token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminPrivateRoute;
