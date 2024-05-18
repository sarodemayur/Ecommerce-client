import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { IoMdArrowForward } from "react-icons/io";
import { cartContext } from "../contexts/Cartcontext";
import CartItem from "./CartItem";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const {  clearCart, total, itemAmount } = useContext(cartContext);
  const { isOpen, handleCLose } = useContext(SidebarContext);

  return (
    <div
      className={` ${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-200 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-centre justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping bag ({itemAmount})
        </div>
        <div
          onClick={handleCLose}
          className="cursor-pointer w-8 h-8 flex justify-centre items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b ">
        {/* {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })} */}
        <CartItem/>
        <div>
        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white">Buy Now</button></div>
      </div>
      <div>
        <div className=" flex w-full justify-between items-center">
          <div>
            <span>Total:</span> $ {parseFloat(total).toFixed(2)}
          </div>
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-pink-500 text-white w-12 h-12 flex justify-center items-center text-xl "
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to="/"
          className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium "
        >
          View Cart
        </Link>
        <Link
          to="/"
          className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
