/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect,useContext } from "react";
import CartItem from "../components/CartItem";
import jsPDF from "jspdf";
import { useAuth } from "../contexts/Authcontext";
import {loadStripe} from '@stripe/stripe-js';
import { toast } from 'react-toastify';

const CheckOut = () => {
  const {cart} = useAuth();
  const [input, setInput] = useState({
    Fullname: "",
    FullAddress: "",
    Address: "",
    State: "",
    Phone: "",
  });

  const [errors,setErrors]= useState({
    Fullname: "",
    FullAddress: "",
    Address: "",
    State: "",
    Phone: "",
  })

  const { Fullname, FullAddress, Address, State, Phone } = input;
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm()){
      handleDownload();
    }else{
      alert("Something Went Wrong");
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {...errors};
    if(!Fullname.trim()){
      newErrors.Fullname = "Fullname is Required";
      valid = false
    }else{
      newErrors.Fullname = "";
    }

    if(!FullAddress.trim()){
      newErrors.FullAddress = "Address is Required";
      valid = false
    }else{
      newErrors.FullAddress = "";
    }

    if(!Address.trim()){
      newErrors.Address = "Address is Required";
      valid = false
    }else{
      newErrors.Address = "";
    }

    if(!State.trim()){
      newErrors.State = "State is Required";
      valid = false
    }else{
      newErrors.State = "";
    }

    if (!Phone.trim() || isNaN(Phone) || Phone.length !== 10) {
      newErrors.Phone = "Phone number is invalid";
      valid = false;
    } else {
      newErrors.Phone = "";
    }

    setErrors(newErrors)
    return valid;
  }

  const paymentgateway = async() => {
     const stripePromise = loadStripe('pk_test_51PFrMGSHoSIOpCN6upXCS9xuC8PpjzVhWX9b10rpccPBGBp2yzzZHijGFgWfmGxJ4bEa1EgeXD91RrA5mj9o3dZM00lgXc3b9p')
     const stripe = await stripePromise;
     const body = {
      cart:cart
     }
     const headers = {
       "Content-Type":"Application/json"
     }
     const response = await fetch(`http://localhost:8000/api/auth/user/create-checkout-session`,{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
     });
     const session = await response.json();
     const result =await stripe.redirectToCheckout({
      sessionId:session.id
     });
     if(result.error){
      throw new Error(result.error.message);
     }
  }

  const handleDownload = async(e) => {
    e.preventDefault();
    if(validateForm()){
    const pdf = new jsPDF();
    pdf.text(`User Details`, 90, 10);
    pdf.text(`Fullname : ${Fullname}`, 10, 20);
    pdf.text(`FullAddress : ${FullAddress}`, 10, 30);
    pdf.text(`Address : ${Address}`, 10, 40);
    pdf.text(`State :${State}`, 10, 50);
    pdf.text(`Phone : ${Phone}`, 10, 60);
    pdf.text(`Products`, 90, 70);

    let startY = 80;
    cart?.forEach((item, index) => {
      const yPos = startY + index * 20;
      pdf.text(`Item ${index + 1}:${item.productId.title} Price:$${item.productId.price} Quantity:${item.quantity}`, 10, yPos);
      pdf.text(`Total Price: ${item.productId.price * item.quantity}`, 10, 100);
    });
    pdf.save("OrderDetails.pdf");
    const newPayment = {
      Fullname,
      FullAddress,
      Address,
      State,
      Phone
    };
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8000/api/auth/user/payment-details`,{
        method:"POST",
        headers:{
          "Content-Type":"Application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({cart, Fullname,Phone})
      });
      if(response.ok){
        const data = await response.json();
        console.log("Cart data sent to server successfully")
      }else{
        throw new Error("Failed to Send cart data to Server")
      }
      console.log(cart);
    } catch (error) {
      console.error("Error sending cart data:", error);
    } 
    await paymentgateway();
  }else{
    console.log("Form Submission Failed please check the inputs")
    toast.error("Please fill all fields")
  }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="pt-32 pb-12 lg:py-32 flex items-center">
        <div className="container mx-auto">
          <div>
            <h1 className="text-center font-bold text-[20px] underline">
              Checkout
            </h1>
          </div>
          <div className="container m-auto px-6 md:px-12 xl:px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
              <div className="container col-3 mt-1 flex-auto flex-space-x-4">
                <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b">
                  {/* {user.cart.map((item) => {
                    return <CartItem item={item} key={item.productId} />;
                  })} */}
                   <CartItem/>
                  <div>
                    <div className="flex w-full justify-between items-center">
                      <div className="font-bold text-[15px] underline">
                        You have {cart.length} products in cart.
                      </div>
                      {cart?.forEach((item,index) => {
                      <div className="font-bold underline">
                        <span>Total Price : </span> ${" "}
                        {parseFloat(item.productId.price * 100).toFixed(2)}
                      </div>})}
                    </div>
                  </div>
                  <div className="container m-auto px-6 md:px-12 xl:px-6 items-center">
                    <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12 items-center">
                      <div className="container col-3 mt-3 flex-auto flex-space-x-4 items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                          <div className="p-6 flex flex-col justify-center ">
                            <form
                              className="p-6 flex flex-col justify-center border border-primary "
                              onSubmit={handleSubmit}
                              ref={formRef}
                            >
                              <h3 className="font-bold underline text-center text-[20px]">
                                Enter Details
                              </h3>
                              <div className="flex flex-col  ">
                                <label htmlFor="Fullname" className="hidden">
                                  Fullname
                                </label>
                                <input
                                  type="text"
                                  name="Fullname"
                                  id="Fullname"
                                  placeholder="Full Name"
                                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                  required
                                  autoComplete="off"
                                  value={input.Fullname}
                                  onChange={handleChange}
                                />
                                {errors.Fullname && (
                                  <span className="text-red-500">{errors.Fullname}</span>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <label htmlFor="Address" className="hidden">
                                  Address
                                </label>
                                <input
                                  type="textarea"
                                  name="FullAddress"
                                  id="Address"
                                  placeholder="Enter Delivery Address"
                                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                  required
                                  autoComplete="on"
                                  value={input.FullAddress}
                                  onChange={handleChange}
                                />
                                {errors.FullAddress && (
                                  <span className="text-red-500">{errors.FullAddress}</span>
                                )}
                              </div>
                              <div className="flex flex-col ">
                                <label htmlFor="Address" className="hidden">
                                  Address
                                </label>
                                <input
                                  type="textarea"
                                  name="Address"
                                  id="Address"
                                  placeholder="Address line-2"
                                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                  required
                                  autoComplete="off"
                                  value={input.Address}
                                  onChange={handleChange}
                                />
                                {errors.Address && (
                                  <span className="text-red-500">{errors.Address}</span>
                                )}
                              </div>
                              <div className="flex flex-col ">
                                <label htmlFor="State" className="hidden">
                                  State
                                </label>
                                <input
                                  type="text"
                                  name="State"
                                  id="State"
                                  placeholder="State"
                                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                  required
                                  autoComplete="off"
                                  value={input.State}
                                  onChange={handleChange}
                                />
                                {errors.State && (
                                  <span className="text-red-500">{errors.State}</span>
                                )}
                              </div>
                              <div className="flex flex-col ">
                                <label htmlFor="Phone" className="hidden">
                                  Phone
                                </label>
                                <input
                                  type="Number"
                                  name="Phone"
                                  id="Phone"
                                  placeholder="phone"
                                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                  required
                                  autoComplete="off"
                                  value={input.Phone}
                                  onChange={handleChange}
                                />
                                {errors.Phone && (
                                  <span className="text-red-500">{errors.Phone}</span>
                                )}
                              </div>
                              <div className="items-center justify-evenly">
                                <button
                                  onClick={handleDownload}
                                  type="submit"
                                  className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
                                >
                                  Place Order
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckOut;
