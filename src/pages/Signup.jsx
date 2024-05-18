import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext";
import {toast} from 'react-toastify';


const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const {storeTokenInLS} = useAuth();

  const [errors,setErrors] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();
   // localStorage.setItem("value", JSON.stringify(input));
   console.log(input);
   if(validate()){
   try{
    const response =await fetch('http://localhost:8000/api/auth/register', {
      method:"POST",
      headers : {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(input),
    });
     if(response.ok){
      toast.success('Registration successful');
      const res_data = await response.json();
      console.log('response from server', res_data);
      storeTokenInLS(res_data.token);
      //localStorage.setItem("token", res_data)
      setInput({username:"", email:"", password:""});
     }else{
      toast.error('something went wrong');
     }

    console.log(response);
    navigate("/login");
  } catch (error){
    console.log("register",error)
  }
}
  };

  const validate = () => {
    let isValid = true;
    const errors = {};

    if(!input.email){
      errors.email = "Email is Required"
      isValid = false;
    }else if(!/\S+@\S+\.\S+/.test(input.email)){
      errors.email = "Email address is invalid"
      isValid = false;
    }

    if(!input.password){
      errors.password = "Password cannot be empty"
    }else if(input.password.length < 6){
      errors.password = "password must be atleast 6 characters long"
      isValid = false;
    }

    setErrors(errors)
    return isValid;
  }

  const handleNavigate = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((input) => ({
      ...input,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 ">
          <div className="mt-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 flex flex-col justify-center">
                <form
                  className="p-6 flex flex-col justify-center border border-[#2a1212a1]"
                  onSubmit={handleSubmit}
                >
                  <h1 className="text-[26px] font-bold  text-center">
                    Sign-Up
                  </h1>
                  <div className="flex flex-col">
                    <label htmlFor="Username" className="hidden">
                      create username
                    </label>
                    <input
                      type="username"
                      name="username"
                      id="username"
                      placeholder="Username"
                      className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                      required
                      autoComplete="on"
                      maxLength={20}
                      value={input.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col mt-2">
                    <label htmlFor="Email" className="hidden">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className={`w-100 mt-2 py-3 px-3 rounded-lg bg-white border ${
                        errors.email ? "border-red-500" : "border-gray-400"
                      } text-gray-800 font-semibold focus:border-orange-500 focus:outline-none`}
                      autoComplete="on"
                      maxLength={20}
                      value={input.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className="text-red-500">{errors.email}</span>
                    )}
                  </div>
                  <div className="flex flex-col mt-2">
                    <label htmlFor="Password" className="hidden">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className={`w-100 mt-2 py-3 px-3 rounded-lg bg-white border ${
                        errors.password ? "border-red-500" : "border-gray-400"
                      } text-gray-800 font-semibold focus:border-orange-500 focus:outline-none`}
                      autoComplete="on"
                      maxLength={20}
                      value={input.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <span className="text-red-500">{errors.password}</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
                  >
                    Register
                  </button>
                  <div>
                    Already have Account ?
                    <h5
                      className="cursor-pointer underline font-bold"
                      onClick={handleNavigate}
                    >
                      Login
                    </h5>
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

export default Signup;
