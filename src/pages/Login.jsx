import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext";
import { toast } from 'react-toastify';
const URL = "http://localhost:8000/api/auth/login";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { storeTokenInLS } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      console.log("login form", response);

      if (response.ok) {
        const res_data = await response.json();
        toast.success("Login successful");
        storeTokenInLS(res_data.token);
        localStorage.setItem("userId", res_data.userId);
        setInput({ email: "", password: ""});
        navigate("/");
      } else {
        toast.error("invalid credentials");
        console.log("invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    navigate("/signup");
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((input) => ({
      ...input,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="p-6 mr-2 bg-white sm:rounded-lg border-y ">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 flex flex-col justify-center border border-[#2410107f]">
                <form
                  className="p-6 flex flex-col justify-center"
                  onSubmit={handleSubmit}
                >
                  <h1 className="text-[26px] font-bold  text-center">Login</h1>
                  <div className="flex flex-col mt-2">
                    <label htmlFor="Email" className="hidden">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                      required
                      autoComplete="on"
                      value={input.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col mt-2 relative">
                    <label htmlFor="Password" className="hidden">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                      autoComplete="on"
                      value={input.password}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300 justify-center"
                  >
                    Login
                  </button>
                  <div>
                    Don't have account ?
                    <div
                      className="cursor-pointer font-bold underline"
                      onClick={handleNavigate}
                    >
                      Sign-up
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
