/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useAuth } from "./Authcontext";

export const cartContext = createContext();

const CartProvider = ({ children }) => {
  const {user} = useAuth();
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState([]);
  const [itemAmount, setitemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((ac, ci) => {
      return ac + ci.price * ci.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((ac, ci) => {
        return ac + ci.amount;
      }, 0);
      setitemAmount(amount);
    }
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };

    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = async(id, productId) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
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
       console.log(response);
    } catch (error) {
      console.log({ error: error });
    }
  };

  const clearCart = async(userId,id) => {
     setCart([]);
     user.cart = [];
     user.cart.length = 0;
    try {
      const response = await fetch(`http://localhost:8000/api/auth/user/cart/remove`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({userId:userId,id})
      });
     console.log(response);
      
    } catch (error) {
      console.log({error:error.message});
    }
  };

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  const decreaseAmount = async(id,productId) => {
    // const cartItem = cart.find((item) => 
    //  item.id === id);
     try {
      const response = await fetch(`http://localhost:8000/api/auth/user/cart/decreaseQuantity`,{
        method:"PUT",
        headers:{
          "Content-Type":"Application/json"
        },
        body:JSON.stringify({productId:productId, userId}),
      }
      );
      console.log(response);
     } catch (error) {
      console.log({error:error.message})
     }
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
