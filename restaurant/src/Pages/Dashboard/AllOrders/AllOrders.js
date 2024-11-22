import React, { useEffect, useState } from "react";

function AllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    fetch("http://localhost:7000/api/order") // Ensure endpoint URL is correct
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };
  const handleStatusChange = (orderId, newStatus) => {
    fetch(`http://localhost:7000/api/order/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <div className="mx-auto p-4 sm:ml-64 bg_dashboard">
      <div className="mt-5">
        {orders.length > 0 ? (
          <table className="table-auto w-full   bg-white/50 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Order ID</th>
                <th className="border-b px-4 py-2">Name</th>
                <th className="border-b px-4 py-2">Phone</th>
                <th className="border-b px-4 py-2">Items</th>
                <th className="border-b px-4 py-2">Delivery Address</th>
                <th className="border-b px-4 py-2">Status</th>
                <th className="border-b px-4 py-2">Total Amount</th>
                <th className="border-b px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td className="border-b px-4 py-2">{index + 1}</td>
                  <td className="border-b px-4 py-2">
                    {order.DeliveryAddress.name}
                  </td>
                  <td className="border-b px-4 py-2">
                    {order.DeliveryAddress.phone}
                  </td>
                  <td className="border-b px-4 py-2">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.name} (x{item.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="border-b px-4 py-2">
                    {order.DeliveryAddress.address}
                  </td>
                  <td className="border-b px-4 py-2">
                    <select
                      className="border-b px-4 py-2"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="border-b px-4 py-2">${order.totalAmount}</td>
                  <td className="border-b px-4 py-2">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No orders found</p>
        )}
      </div>
    </div>
  );
}

export default AllOrders;
