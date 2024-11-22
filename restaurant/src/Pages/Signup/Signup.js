import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  let [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    confirmPassword: "",
  });
  const [responseMessage, setResponseMessage] = useState(null);
  // Handle input change for all inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };
  console.log(signupForm);
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // send data to API
    fetch("http://localhost:7000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupForm),
    })
      .then((res) => {
        if (!res.ok) {
          // Log the actual response body for more details
          return res.json().then((data) => {
            console.log("Response error:", data);
            throw new Error(data.message || "Failed to register");
          });
        }
        return res.json();
      })
      .then((data) => {
        setResponseMessage("Registration successful");
        console.log("Success:", data);
        navigate("/login");
      })
      .catch((e) => {
        setResponseMessage(e.message);
        console.log("Error:", e.message); // Log the actual error message
      });
  };

  return (
    <div>
      <div className="login">
        <div>
          <div className="bg-orange-700">
            <Header />
          </div>
          <div className="md:w-4/5 mx-5 my-10  bg-gray-100 rounded-md shadow-2xl md:m-auto h-auto md:mb-40 md:mt-20 flex flex-col-reverse lg:flex-row  justify-between  ">
            <div className="p-10 lg:w-1/2 lg:p-20 md:p-10">
              <h2 className="font-semibold text-2xl mb-10 ">Sign Up</h2>
              <form
                class="max-w-md mx-auto text-left   "
                onSubmit={handleSubmit}
              >
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="firstName"
                      id="floating_first_name"
                      class="block  py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={signupForm.firstName}
                      onChange={handleInputChange}
                    />
                    <label
                      for="floating_first_name"
                      class="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                    >
                      First name
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="lastName"
                      id="floating_last_name"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={signupForm.lastName}
                      onChange={handleInputChange}
                    />
                    <label
                      for="floating_last_name"
                      class="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                    >
                      Last name
                    </label>
                  </div>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="email"
                    id="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={signupForm.email}
                    onChange={handleInputChange}
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                  >
                    Email address
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    name="password"
                    id="floating_password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={signupForm.password}
                    onChange={handleInputChange}
                  />
                  <label
                    for="floating_password"
                    class="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                  >
                    Password
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="floating_repeat_password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={signupForm.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <label
                    for="floating_repeat_password"
                    class="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                  >
                    Confirm password
                  </label>
                </div>

                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="relative z-0 w-full mb-5 group">
                    <input
                      type="tel"
                      name="phone"
                      id="floating_phone"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={signupForm.phone}
                      onChange={handleInputChange}
                    />
                    <label
                      for="floating_phone"
                      class="peer-focus:font-medium absolute text-sm  transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                      required
                    >
                      Phone number
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="address"
                      id="floating_company"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={signupForm.address}
                      onChange={handleInputChange}
                    />
                    <label
                      for="floating_company"
                      class="peer-focus:font-medium absolute text-sm transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                      required
                    >
                      Address
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  class="text-white bg-orange-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  Submit
                </button>
              </form>
              <p>{responseMessage}</p>
            </div>
            <div className="bg-green-900 h-auto lg:w-1/3 login-right rounded-md">
              <div className="bg-black bg-opacity-40 pt-16 lg:pt-36 h-full ">
                <h1 className=" text-2xl text-white">Hello Friend !</h1>
                <p className="text-gray-300 text-lg mt-5">
                  Enter your personal details <br></br> and start your journey
                  with us
                </p>
                <Link to={"/login"}>
                  <button className="bg-orange-700 text-white py-1 rounded-md mt-5 px-5 mb-5">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-2xl my-10 text-white">Sign Up</h2>
    </div>
  );
}
