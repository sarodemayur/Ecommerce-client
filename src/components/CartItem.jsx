/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { cartContext } from "../contexts/Cartcontext";
import { useAuth } from "../contexts/Authcontext";

const CartItem = ({item}) => {
  const { user, cart } = useAuth();
  const [Product, setProduct] = useState({});
  const userId = localStorage.getItem("userId");
  const auth = JSON.parse(localStorage.getItem("loggedin"));
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(cartContext);
  // const { id, title, image, price, amount } = item;



  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/user/cart/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: productId, userId }),
        }
      );
      // console.log(response);
    } catch (error) {
      console.log({ error: error });
    }
  };
  
  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/auth/user/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId, userId }),
      });
      console.log(response);
      if (response.ok) {
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  return (
    <>
      {cart?.map((Product,index) => (
        <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500" key={index}>
          <div className="w-full min-h-[150px] flex items-centre gap-x-4">
            <Link to={`/product/${Product.productId._id}`}>
              <img
                className="max-w-[80px]"
                src={Product.productId.image}
                alt=""
              />
            </Link>
            <div className="w-full flex flex-col">
              <div className="flex justify-between mb-2">
                <Link
                  to={`/product/${Product.productId._id}`}
                  className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
                >
                  {Product.productId.title}
                </Link>
                <div className="">
                  <div
                    className="text-xl cursor-pointer"
                    onClick={() => handleDelete(Product.productId)}
                  >
                    <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
                  </div>
                </div>
              </div>
              <div className=" flex gap-x-2 h-[36px] text-sm">
                <div className="flex flex-1 max-w-[100px]  items-centre h-full border text-primary font-medium">
                  <div
                    onClick={() => decreaseAmount(Product.productId)}
                    className="flex-1 h-full flex justify-center items-center cursor-pointer"
                  >
                    <IoMdRemove />
                  </div>
                  <div className="h-full flex justify-center items-center px-2">
                    {" "}
                    {Product.quantity}
                  </div>
                  <div
                    onClick={() => handleAddToCart(Product.productId)}
                    className="flex-1 h-full flex justify-center items-center cursor-pointer"
                  >
                    <IoMdAdd />
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-around font-bold">
                  Price : ${Product.productId.price}
                </div>
                <div className="flex-1 flex text-primary justify-end items-center font-medium ">{` Total Price: $  ${parseFloat(
                  Product.productId.price * Product.quantity
                ).toFixed(2)}`}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;
