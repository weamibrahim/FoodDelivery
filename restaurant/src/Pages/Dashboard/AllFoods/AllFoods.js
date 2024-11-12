import React from "react";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
function AllFoods() {
  const [Foods, setFoods] = useState([]);

  useEffect(() => {
    GetAllFood();
  }, []);
  const GetAllFood = () => {
    fetch("https://fooddelivery-ivory.vercel.app/api/food/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFoods(data);
      });
  };
  const handleDelete = (id) => {
    fetch(`https://fooddelivery-ivory.vercel.app/api/food/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setFoods(Foods.filter((Food) => Food._id !== id));
      });
  };
  return (
    <div className="mx-auto p-4 sm:ml-64 mt-16">
      <button className="bg-green-500 rounded-md w-20 h-10 mb-3">
        <NavLink to="/dashboard/create">create</NavLink>
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/20 border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Id</th>
              <th className="py-2 px-4 border-b">image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">category</th>
              <th className="py-2 px-4 border-b">price</th>
              <th className="py-2 px-4 border-b">description</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {Foods.map((Food, index) => (
              <tr key={Food._id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={Food.image}
                    alt="food"
                    className="w-20 h-20 rounded-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">{Food.name}</td>
                <td className="py-2 px-4 border-b">{Food.category}</td>
                <td className="py-2 px-4 border-b">{Food.price}</td>
                <td className="py-2 px-4 border-b">{Food.description}</td>

                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-red-500 text-white rounded-md"
                    onClick={() => handleDelete(Food._id)}
                  >
                    <MdDelete className="text-2xl m-2" />
                  </button>
                  <button className="bg-cyan-500 rounded-md text-white">
                    <NavLink to={`/dashboard/update/${Food._id}`}>
                      <FaEdit className="text-2xl m-2" />
                    </NavLink>
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

export default AllFoods;
