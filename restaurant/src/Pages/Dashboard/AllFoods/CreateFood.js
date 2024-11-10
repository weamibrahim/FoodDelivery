import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateFood() {
  const navigate = useNavigate();
  const [FoodData, setFoodData] = useState({
    name: "",
    description: "",
    // image:"",
    price: "",
    category: "",
  });
  //console.log(FoodData)
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    console.log(FoodData);
    event.preventDefault();
    fetch(`https://fooddelivery-ivory.vercel.app/api/food/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(FoodData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Food created successfully");
          navigate("/dashboard/foods");
        } else {
          return response.json().then((errorData) => {
            console.error(
              "Error creating Food:",
              response.statusText,
              errorData
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error creating Food:", error);
      });
  };

  return (
    <div className="mx-auto p-4 sm:ml-64 mt-16">
      <div className="flex justify-center">
        <div>
          <h2 className="text-center"> Create New </h2>
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className=" my-5"
              encType="multipart/form-data"
            >
              <label>Name: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="text"
                name="name"
                value={FoodData.name}
                onChange={handleInputChange}
              />
              <br />

              <label>category: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="text"
                name="category"
                value={FoodData.category}
                onChange={handleInputChange}
              />
              <br />

              <label>description</label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="text"
                name="description"
                value={FoodData.description}
                onChange={handleInputChange}
              />
              <br />

              <label>Price: </label>
              <input
                className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
                type="number"
                name="price"
                value={FoodData.price}
                onChange={handleInputChange}
              />
              <br />
              {/* <label>image: </label>
            <input
              className="block border-black border w-full focus:ring-green-400 focus:border-green-400 rounded-md"
              type="text"
              name="image"
              value={FoodData.image}
              onChange={handleInputChange}
            />
            <br /> */}
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
