import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Base from "./Component/Base";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";

import { ToastContainer } from "react-toastify";
import PrivateUserRout from "./Component/PrivateUserRout";
import PrivateProductRout from "./Component/PrivateProductRout";
import Dashboard from "./Pages/user-routs/Dashboard";
import UserProfile from "./Pages/user-routs/UserProfile";
import AddProduct from "./Pages/product-routs/AddProduct";
import AllProducts from "./Pages/product-routs/AllProducts";
import DeleteProduct from "./Pages/product-routs/DeleteProduct";
import UpdateProduct from "./Pages/product-routs/UpdateProduct";
import PlaceOrder from "./Pages/order-routs/PlaceOrder";
import OrderHistory from "./Pages/order-routs/OrderHistory";
import UpdateProductQuantity from "./Pages/inventory-routs/UpdateProductQuantity";
import ViewInventory from "./Pages/inventory-routs/ViewInventory";
import PromoteEmployee from "./Pages/employee-routs/PromoteEmployee";
import AllEmployees from "./Pages/employee-routs/AllEmployees";
import AddEmployee from "./Pages/employee-routs/AddEmployee";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />

        <Route path="/user" element={<PrivateUserRout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="userprofile" element={<UserProfile />} />
        </Route>
        <Route path="/product" element={<PrivateProductRout />}>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="allproducts" element={<AllProducts />} />
          <Route path="deleteproduct/:productid" element={<DeleteProduct />} />
          <Route path="updateproduct/:productid" element={<UpdateProduct />} />
        </Route>

        <Route path="/order" element={<PrivateUserRout />}>
          <Route path="placeorder" element={<PlaceOrder />} />
          <Route path="orderhistory" element={<OrderHistory />} />
        </Route>

        <Route path="/inventory" element={<PrivateUserRout />}>
          <Route
            path="updateproductquantity"
            element={<UpdateProductQuantity />}
          />
          <Route path="viewinventory" element={<ViewInventory />} />
        </Route>

        <Route path="/employees" element={<PrivateUserRout />}>
          <Route path="promoteemployee" element={<PromoteEmployee />} />
          <Route path="allemployee" element={<AllEmployees />} />
          <Route path="addemployee" element={<AddEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
