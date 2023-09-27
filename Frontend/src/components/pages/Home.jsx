import React from "react";
import Layout from "../layouts/Layout";
import useAuth from "../../context/AuthContext";

const Home = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Deal Daddy - Online Shopping Website"}>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth, null, 1)}</pre>
    </Layout>
  );
};

export default Home;
