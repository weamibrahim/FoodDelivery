import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateFood() {
  const { id } = useParams(); // Get the food item ID from the URL
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  // Fetch the existing food item data
  useEffect(() => {
    fetch(`https://fooddelivery-ivory.vercel.app/api/food/${id}`)
      .then((response) => response.json())
      .then((data) => setFoodData(data))
      .catch((error) => console.error("Error fetching food data:", error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://fooddelivery-ivory.vercel.app/api/food/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...foodData,
        price: Number(foodData.price), // Ensure price is a number
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Food updated successfully");
          navigate("/dashboard/foods");
        } else {
          return response.json().then((errorData) => {
            console.error("Error updating Food:", errorData.message);
          });
        }
      })
      .catch((error) => {
        console.error("Error updating Food:", error);
      });
  };

  return (
    <div className="mx-auto p-4 sm:ml-64 mt-16">
      <h2 className="text-center">Update Food Item</h2>
      <form onSubmit={handleSubmit} className="my-5">
        <label>Name: </label>
        <input
          className="block border w-full rounded-md"
          type="text"
          name="name"
          value={foodData.name}
          onChange={handleInputChange}
        />
        <br />

        <label>Category: </label>
        <input
          className="block border w-full rounded-md"
          type="text"
          name="category"
          value={foodData.category}
          onChange={handleInputChange}
        />
        <br />

        <label>Description: </label>
        <input
          className="block border w-full rounded-md"
          type="text"
          name="description"
          value={foodData.description}
          onChange={handleInputChange}
        />
        <br />

        <label>Price: </label>
        <input
          className="block border w-full rounded-md"
          type="number"
          name="price"
          value={foodData.price}
          onChange={handleInputChange}
        />
        <br />

        <div className="flex justify-center">
          <button className="btn btn-info" type="submit">
            Update Food
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateFood;
