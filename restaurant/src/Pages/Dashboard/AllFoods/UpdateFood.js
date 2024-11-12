import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateFood() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    axios
      .get(`https://fooddelivery-ivory.vercel.app/api/food/${id}`)
      .then((response) => setFoodData(response.data))
      .catch((error) => console.error("Error fetching food data:", error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      setFoodData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFoodData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(foodData).forEach((key) => {
      formData.append(key, foodData[key]);
    });

    axios
      .put(`https://fooddelivery-ivory.vercel.app/api/food/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Food updated successfully");
          navigate("/dashboard/foods");
        }
      })
      .catch((error) => {
        console.error("Error updating food:", error);
      });
  };

  return (
    <div className="mx-auto p-4 sm:ml-64 mt-16">
      <h2 className="text-center">Update Food Item</h2>
      <form onSubmit={handleSubmit} className="my-5">
        <label>Image: </label>
        <input
          className="block border w-full rounded-md"
          type="file"
          name="image"
          onChange={handleInputChange}
        />

        <br />
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
