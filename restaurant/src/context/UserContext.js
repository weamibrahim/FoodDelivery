import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  console.log(user);
  // Update user details
  const updateUser = async (userId, updatedDetails) => {
    try {
      const response = await fetch(
        `https://fooddelivery-ivory.vercel.app/api/user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDetails),
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        console.log("User details updated:", responseData);
        setUser(responseData); // Update local state
        localStorage.setItem("user", JSON.stringify(responseData)); // Update local storage
      } else {
        console.error("Error updating user:", response.status, responseData);
      }
    } catch (error) {
      console.error("Error with updateUser API request:", error);
    }
  };

  // Delete user account
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `https://fooddelivery-ivory.vercel.app/api/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("User account deleted");
        setUser(null); // Clear user from state
        localStorage.removeItem("user"); // Clear user from local storage
      } else {
        const responseData = await response.json();
        console.error("Error deleting user:", response.status, responseData);
      }
    } catch (error) {
      console.error("Error with deleteUser API request:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
