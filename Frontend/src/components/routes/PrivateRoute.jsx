import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import Spinner from "../Spinner";
import axios from "axios";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [cookies] = useCookies("token");
  const token = cookies.token;

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (token) authCheck();
  }, [token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
