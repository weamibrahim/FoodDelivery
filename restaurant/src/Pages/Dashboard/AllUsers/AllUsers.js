import React from "react";
import { useState, useEffect } from "react";

import { MdDelete } from "react-icons/md";
function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetAllUser();
  }, []);
  const GetAllUser = () => {
    fetch("https://food-delivery-two-phi.vercel.app/api/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  };
  const handleDelete = (id) => {
    fetch(`https://food-delivery-two-phi.vercel.app/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setUsers(users.filter((user) => user._id !== id));
      });
  };
  return (
    <div className="mx-auto p-4 sm:ml-64 bg_dashboard min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/50 border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Id</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Admin</th>
              <th className="py-2 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  {user.firstName} {user.lastName}
                </td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  {user.role === "admin" ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-red-500 text-white rounded-md"
                    onClick={() => handleDelete(user._id)}
                  >
                    <MdDelete className="text-2xl m-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;
