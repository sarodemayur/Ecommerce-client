import React from "react";
import { BsPlus } from "react-icons/bs";
//import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext";
//import { useAuth } from '../contexts/Authcontext';
import {toast} from 'react-toastify';

const Product = ({ product }) => {
  const userId = localStorage.getItem("userId");
  const { products,setCart,cart } = useAuth();
  //  const {isLoggedIn} = useAuth();
  // const auth = JSON.parse(localStorage.getItem("loggedin"));
  // const {id, image, category, title, price } = product;

  
  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/auth/user/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId:productId, userId}),
      });
      console.log(response);
      if(response.ok){
        setCart(cart)
      toast.success("Product added successfully to the cart");
      }else{
        toast.error("please login");
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };
  
  return (
    <>
      {products?.map((curElem, index) => {
        const { _id, title, price, category, image,rating } = curElem;
        return (
          <div key={index} className="mb-8"> {/* Wrap each product within a div */}
            <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-[200px] mx-auto flex justify-center items-center">
                  <img
                    className="max-h-[160px] group-hover:scale-110 transition duration-300"
                    src={image}
                    alt=""
                  />
                </div>
              </div>
              <div className="absolute top-0 right-0 bg-blue-500 p-2">
                <button onClick={() => handleAddToCart(curElem)}> {/* Use curElem instead of product */}
                  <div className="flex justify-center items-center text-white w-10 h-10 ">
                    <BsPlus className="text-3xl" />
                  </div>
                </button>
              </div>
            </div>
            <div>
              {category}
              <Link to={`/product/${_id}`}>
                <h2 className="font-semibold mb-1">{title}</h2>
              </Link>
              <div className="font-semibold">Price: ${price}</div>
              <div className="font-semibold">Rating :{rating.rate}</div>
              <button
                onClick={() => handleAddToCart(curElem)} 
                className="h-10 px-6 font-semibold rounded-md bg-black text-white"
              >
                Add to cart
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Product;
