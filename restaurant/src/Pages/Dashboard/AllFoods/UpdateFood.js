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
      .get(`https://food-delivery-two-phi.vercel.app/api/food/${id}`)
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
      .put(
        `https://food-delivery-two-phi.vercel.app/api/food/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
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
    <div className="mx-auto p-4 sm:ml-64 bg_dashboard">
      <div className="flex justify-center">
        <div>
          <h2 className="text-center text-white">Update Food Item</h2>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="my-5">
              <label className="text-white">Image: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="file"
                name="image"
                onChange={handleInputChange}
              />
              <br />
              <label className="text-white">Name: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="text"
                name="name"
                onChange={handleInputChange}
                value={foodData.name}
              />
              <br />
              <label className="text-white">Category: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="text"
                name="category"
                onChange={handleInputChange}
                value={foodData.category}
              />
              <br />
              <label className="text-white">Description: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="text"
                name="description"
                onChange={handleInputChange}
                value={foodData.description}
              />
              <br />
              <label className="text-white">Price: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="number"
                name="price"
                onChange={handleInputChange}
                value={foodData.price}
              />
              <br />
              <div className="flex justify-center">
                <button
                  className="bg-green-500 rounded-md w-20 h-10 text-white"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateFood;
