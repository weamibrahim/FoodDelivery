import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function AccountSettings() {
  const { user, updateUser, deleteUser } = useContext(UserContext);
  const [updatedDetails, setUpdatedDetails] = useState({
    email: user?.email || "",
    password: "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    phone: user?.phone || "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    if (user) {
      updateUser(user._id, updatedDetails);
      navigate("/user");
    }
  };

  const handleDelete = () => {
    if (user) {
      if (
        window.confirm(
          "Are you sure you want to delete your account? This action is irreversible."
        )
      ) {
        deleteUser(user._id);
        navigate("/signup")
      }
    }
  };

  return (
    <>
     <div className="bg-orange-700"><Header/></div>
    <div className="flex flex-col mt-16 items-center min-h-screen p-4 bg-gray-50">
     
      <h1 className="text-2xl font-bold mb-6 text-center">Account Settings</h1>

      {user ? (
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={updatedDetails.firstName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={updatedDetails.lastName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={updatedDetails.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={updatedDetails.password}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                value={updatedDetails.phone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={updatedDetails.address}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={handleUpdate}
              className="w-full bg-orange-700 text-white py-2 rounded-md  transition duration-200"
            >
              Update Account
            </button>
          </form>

          <button
            onClick={handleDelete}
            className="w-full bg-gray-300 text-orange-950 py-2 mt-4 rounded-md hover:bg-orange-800 transition duration-200"
          >
            Delete Account
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-700 mt-6">No user logged in</p>
      )}
    </div>
    </>
  );
}
