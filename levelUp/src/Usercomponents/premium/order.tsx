import React, { useEffect, useState } from "react";
import NoDataImage from './image/Screenshot 2024-09-27 161524.png'; // Update the path if necessary
import { useNavigate } from "react-router-dom";
import UserHeader from "../userHeader";
import { findUserPayment } from "../../Api/payment";
import { useGetUserData } from "../../hook/useGetUser";

const OrderTable = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null); // Initialize with null or empty array if you expect a list
  const user = useGetUserData();

  useEffect(() => {
    const fetchUserOrder = async () => {
      const res = await findUserPayment(user.id);
      console.log(res);
      if (res) {
        setOrder(res);
      }
    };
    fetchUserOrder();
  }, [user.id]); // Add user.id as a dependency

  return (
    <>
      <UserHeader />
      <div className="container mx-auto p-6 mt-10 bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-black">Your Orders</h2>
        <a
          onClick={() => navigate('/premium')}
          className="text-blue-600 hover:underline cursor-pointer text-sm mb-6 block"
        >
          Continue shopping at the Store
        </a>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border text-black">Order ID</th>
                <th className="py-2 px-4 border text-black">Item</th>
                <th className="py-2 px-4 border text-black">Order Placed</th>
                <th className="py-2 px-4 border text-black">Date</th>
           
              </tr>
            </thead>
            <tbody>
              {order !==null? (
                // Loop through the orders if data is available
               
                  <tr key={order.clientId}>
                    <td className="py-2 px-4 border  text-black">{order._id.toString().slice(-6).toUpperCase()}</td>
                    <td className="py-2 px-4 border text-black">{order.subscriptionType.description}</td>
                    <td className="py-2 px-4 border text-black">{'placed'}</td>
                    <td className="py-2 px-4 border text-black">{new Date(order.createAt).toLocaleDateString()}</td>
                    {/* // <td className="py-2 px-4 border text-black">{order.orderPlaced}</td>
                    // <td className="py-2 px-4 border text-black">{order.status}</td> */}
             
                  </tr>
               
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src={NoDataImage} // Image source for No Data
                        alt="No Data"
                        className="h-16 mb-2"
                      />
                      <p className="text-gray-500">No Data</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderTable;
