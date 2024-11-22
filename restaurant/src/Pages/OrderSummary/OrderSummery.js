import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";

export default function OrderSummary() {
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  const userId = JSON.parse(localStorage.getItem("user"))._id; // Get userId from localStorage

  // Fetch orders by userId
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://food-delivery-two-phi.vercel.app/api/order/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data); // Update orders state
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-10">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="bg-orange-700">
        <Header />
      </div>
      {orders.length === 0 ? (
        <div className="text-center mt-10">No orders found</div>
      ) : (
        <div className="container m-auto mt-10">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Address</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Items</th>
                <th className="border border-gray-300 p-2">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="border border-gray-300 p-2">
                    {order.DeliveryAddress.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {order.DeliveryAddress.address}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {order.DeliveryAddress.phone}
                  </td>
                  <td className="border border-gray-300 p-2">{order.status}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.name} (x{item.quantity}) - ${item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 p-2">
                    ${order.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
