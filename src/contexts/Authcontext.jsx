import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [products, setProducts] = useState([]);
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  console.log(isLoggedIn);

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const userAuthentication = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/auth/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.userData);
          const { cart } = data.userData;
          setCart(cart);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userAuthentication();
  }, [token]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/data/product`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data.msg);
          localStorage.setItem("Products", JSON.stringify(data.msg));
        }
      } catch (error) {
        console.log(`products frontend error: ${error}`);
      }
    };
    getProducts();
  }, []);

  return (
    <AuthContext.Provider
      value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, products, cart, setCart, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);
  if (!AuthContextValue) {
    throw new Error("useAuth used outside the provider");
  }
  return AuthContextValue;
};
