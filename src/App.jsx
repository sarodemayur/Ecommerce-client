import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductsPage from "./pages/ProductsPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./components/Cart";
import CheckOut from "./pages/CheckOut";
import { Logout } from "./pages/Logout";
import Sucess from "./components/Sucess";
import Cancel from "./components/Cancel";
import OrderDetails from "./components/OrderDetails";


const App = () => {
  return (
    <>
      <div className="overflow-hidden"></div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/productspage" element={<ProductsPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="/success" element={<Sucess/>}/>
          <Route path="/cancel" element={<Cancel/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/myOrders" element={<OrderDetails/>}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Sidebar />
        <Footer />
      </Router>
    </>
  );
};

export default App;
