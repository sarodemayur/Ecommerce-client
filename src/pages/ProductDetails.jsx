/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../contexts/Cartcontext";
import { useAuth } from '../contexts/Authcontext';

const ProductDetails = () => {
  const [Product, setProduct] = useState({})
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();
 const { id } = useParams();
 console.log("id" , id);
  const { addToCart } = useContext(cartContext);

  useEffect(() => {
    const fetchProduct = async() => {
      const response = await fetch(`http://localhost:8000/api/data/product/${id}`);
      const data = await response.json();
      console.log(data.msg[0])
      setProduct(data.msg[0]);
    };
    fetchProduct();
  },[])

  
  // const product = products.find((item) => {
  //   return item.id === parseInt(id);
  // });

  if (!Product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  //const { title, price, description, image } = product;

  const handleNavigate = () => {
    if (isLoggedIn) {
      addToCart(id)
      navigate("/checkout");
    }
  };

  const handleAddToCart = async(productId) => {
   // console.log(Product, userId);
     try {
       const response = await fetch(`http://localhost:8000/api/auth/user/cart`, {
        method:'POST',
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({productId:productId, userId})
       });
       console.log(response);
     } catch (error) {
       console.log({error:error.message})
     }
  }

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center border border-[#34222253]">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0 ">
            <img className="max-w-[200px] lg:max-w-sm " src={Product.image} alt="" />
          </div>
          <div className="flex-1 justify-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {Product.title}
            </h1>
            <div className="text-xl text-red-500 font-medium mb-6">
              {" "}
              Price : $ {Product.price}
            </div>
            <p className="mb-8">{Product.description}</p>
            <div className="mt-4 space-x-3">
            <button
              onClick={() => handleAddToCart(Product._id)}
              className="h-10 px-6 font-semibold rounded-md bg-black text-white"
            >
              Add to Cart
            </button>
              <button
                onClick={() => handleNavigate()}
                className="h-10 px-6 font-semibold rounded-md bg-black text-white"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
