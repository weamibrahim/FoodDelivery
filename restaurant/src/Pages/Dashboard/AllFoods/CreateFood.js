import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CreateFood() {
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    category: "",
  });

  console.log(foodData);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(foodData).forEach((key) => {
      formData.append(key, foodData[key]);
    });

    console.log("FormData:", formData);

    try {
      await axios
        .post("https://fooddelivery-ivory.vercel.app/api/food", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 201) {
            console.log("Food created successfully");
            navigate("/dashboard/foods");
          }
        })
        .catch((err) => {
          console.error("Error creating food:", err);
        });
    } catch (error) {
      console.error("Error creating food:", error);
    }
  };

  return (
    <div className="mx-auto p-4 sm:ml-64 mt-16">
      <div className="flex justify-center">
        <div>
          <h2 className="text-center">Create New Food</h2>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="my-5">
              <label>Image: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="file"
                name="image"
                onChange={handleInputChange}
              />
              <br />
              <label>Name: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="text"
                name="name"
                onChange={handleInputChange}
                value={foodData.name}
              />
              <br />
              <label>Category: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="text"
                name="category"
                onChange={handleInputChange}
                value={foodData.category}
              />
              <br />
              <label>Description: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="text"
                name="description"
                onChange={handleInputChange}
                value={foodData.description}
              />
              <br />
              <label>Price: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="number"
                name="price"
                onChange={handleInputChange}
                value={foodData.price}
              />
              <br />
              <div className="flex justify-center">
                <button className="btn btn-info" type="submit">
                  Create Food
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFood;
