import React, { useContext } from "react";
import { cartContext } from "../contexts/Cartcontext";
import CartItem from "./CartItem";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const { isLoggedIn, cart, user } = useAuth();
  const { clearCart } = useContext(cartContext);

  if (!isLoggedIn ||!user || user.cart.length === 0) {
    // Handle case when user or cart is not defined
    return (
      <div className="text-center text-gray-500 py-4">Your cart is empty.</div>
    );
  }

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div>
          <h1 className="text-center font-bold text-[20px] underline">Cart</h1>
        </div>
        {user.cart.length === 0  ? (
          <div className="text-center mt-8 font-bold text-[26px] mb-12">
            Cart is Empty
          </div>
        ) : (
          <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b mt-8">
            {/* {user.cart.map((item,index) => {
            return <CartItem item={item} key={item.id} />;
          })} */}
            <CartItem />
          </div>
        )}
        <div>
          <div className="flex w-full justify-between items-center ">
            {/* <div className="font-bold">
              <span>Total : </span> $ {parseFloat(cartData.price * cart.length).toFixed(2)}
            </div> */}
            <div className="font-bold text-[15px] underline">
              You have {cart.length} products in cart.
            </div>
            <div
              onClick={() => clearCart(userId)}
              className="cursor-pointer py-4 bg-pink-500 text-white w-12 h-12 flex justify-center items-center text-xl"
            >
              <FiTrash2 />
            </div>
            {isLoggedIn && (
              <div>
                <Link
                  to="/checkout"
                  className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
