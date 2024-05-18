/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/Authcontext";

const OrderDetails = () => {
  const [data, setData] = useState();
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/auth/user/getProductDetails`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response?.data?.cart);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, []);
// console.log(data);
  return (
    <div className="container mx-auto px-4  mt-8">
      <div className="mt-8">
        <p className="text-xl font-bold mb-4 flex justify-center items-center mt-8">
          {user.username}
        </p>
        {data && (
          <table className="table-auto w-full border-collapse border border-black mt-8 mb-6">
            <thead className="bg-orange-300 ">
              <tr>
                <th className="px-4 py-2 text-left border border-black">
                  Product Title
                </th>
                <th className="px-4 py-2 text-left border border-black">
                  Product Price
                </th>
                <th className="px-4 py-2 text-left border border-black">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left border border-black">
                  Product Image
                </th>
                <th className="px-4 py-2 text-left border border-black">
                  Payment Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="bg-white border border-black">
                  <td className="px-4 py-2 border border-black">
                    {item.title}
                  </td>
                  <td className="px-4 py-2 border border-black">
                    {item.price}
                  </td>
                  <td className="px-4 py-2 border border-black">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 border border-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border border-black">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnK8MfudDpUbXi173OnBN1BuCKvVoX0dYFdfd4n0KB1A&s" alt="Download" className="h-10" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
