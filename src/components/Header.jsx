import React, {useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa"
import { useAuth } from "../contexts/Authcontext";

const Header = () => {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const {isLoggedIn, cart} = useAuth();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  const handleNavigate = () => {
    navigate("/Cart");
  };

  return (
    <>
      <header
        className={`${
          isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
        } fixed w-full z-10 transition-all`}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          <Link to={"/"}>
            <div>
              <img className="w-[100px]" src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png" alt="" />
            </div>
          </Link>
          <Link to={"/productspage"}>
            <div>
              <button className="underline font-bold "> Products</button>
            </div>
          </Link>
          <Link to={"/about"}>
            <div>
              <button className="underline font-bold ">About Us</button>
            </div>
          </Link>
          <Link to={"/contact"}>
            <div>
              <button className="underline font-bold ">Contact</button>
            </div>
          </Link>
          
          {!isLoggedIn ? (
            <>
          <Link
            to={"/signup"}
            className="text-gray-800 hover:bg-red-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            Sign-Up
          </Link>
          <Link
            to={"/login"}
            className="text-gray-800 hover:bg-red-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            Login
          </Link>
          </>
          ) : (
            <>
          <NavLink
           to={'/logout'}
            className="text-gray-800 hover:bg-red-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            Logout
          </NavLink>
          <NavLink
          to={'/myOrders'}
          className="text-gray-800 hover:bg-red-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            MyOrders
          </NavLink>
          </> )}
          <div
            // onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex-relative "
          >
            <FaShoppingCart onClick={handleNavigate} className="text-2xl -right-0" />
      
            <div className="bg-red-500 absolute -right-3-bottom-3 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {cart.length}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
