import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Policy from "./components/pages/Policy";
import PageNotFound from "./components/pages/PageNotFound";
import Register from "./components/pages/Auth/Register";
import Login from "./components/pages/Auth/Login";
import UserPrivateRoute from "./components/routes/UserPrivateRoute";
import AdminPrivateRoute from "./components/routes/AdminPrivateRoute";
import UserDashboard from "./components/user/UserDashboard";
import UserProfilePage from "./components/user/UserProfilePage";
import UserOrdersPage from "./components/user/UserOrdersPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import ForgotPassword from "./components/pages/Auth/ForgotPassword";
import CreateCategory from "./components/admin/CreateCategory";
import CreateProduct from "./components/admin/CreateProduct";
import Users from "./components/admin/Users";
import Products from "./components/admin/Products";
import UpdateProduct from "./components/admin/UpdateProduct";
import SearchPage from "./components/pages/SearchPage";
import ProductDetails from "./components/pages/ProductDetails";
import CartPage from "./components/pages/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        {/* User Private Routes */}
        <Route path="/dashboard" element={<UserPrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfilePage />} />
          <Route path="user/orders" element={<UserOrdersPage />} />
        </Route>
        {/* Admin Private Routes */}
        <Route path="/dashboard" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacypolicy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
