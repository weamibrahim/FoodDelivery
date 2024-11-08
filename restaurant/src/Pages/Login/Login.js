import React, { useState } from 'react';
import './login.css';
import Header from '../../components/Header/Header';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  let [logForm, setLogForm] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();  // Use useNavigate hook

  // Handle input change for all inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLogForm({
      ...logForm,
      [name]: value,
    });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to API
    fetch('https://fooddelivery-ivory.vercel.app/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logForm),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to Login');
        }
        return res.json();
      })
      .then((data) => {
        setResponseMessage('Login is successful');
        const { user, accessToken, message } = data;

        // Store user info and access token in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('message', message);

        // Navigate to the home page after successful login
        navigate('/');
      })
      .catch((e) => {
        setResponseMessage(e.message);
        console.log('Error:', e);
      });
  };

  return (
    <div className='login'>
      <div>
        <div className='bg-orange-700'>
          <Header />
        </div>
        <div className='md:w-4/5 mx-5 my-10 bg-gray-100 rounded-md shadow-2xl md:m-auto h-auto md:mb-40 md:mt-20 flex flex-col-reverse lg:flex-row justify-between'>
          <div className='p-10 lg:w-1/2 lg:p-20 md:p-10'>
            <h2 className='font-semibold text-2xl mb-10'>Log In</h2>
            <form className='max-w-sm mx-auto text-left' onSubmit={handleSubmit}>
              <div className='relative z-0 w-full mb-5 group'>
                <input
                  type='email'
                  name='email'
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  required
                  value={logForm.email}
                  onChange={handleInputChange}
                />
                <label className='peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600'>
                  Email address
                </label>
              </div>
              <div className='relative z-0 w-full mb-5 group'>
                <input
                  type='password'
                  name='password'
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  required
                  value={logForm.password}
                  onChange={handleInputChange}
                />
                <label className='peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600'>
                  Password
                </label>
              </div>

              <button type='submit' className='bg-orange-700 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                Submit
              </button>
              <p>{responseMessage}</p>
            </form>
          </div>
          <div className='bg-green-900 h-auto lg:w-1/3 login-right rounded-md'>
            <div className='bg-black bg-opacity-40 pt-20 h-full'>
              <h1 className='text-2xl text-white'>Welcome Back!</h1>
              <p className='text-white text-lg mt-5'>Nice to see you again</p>
              <Link to='/signup'>
                <button className='bg-orange-700 text-white py-1 rounded-md mt-5 px-5 mb-5'>
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
