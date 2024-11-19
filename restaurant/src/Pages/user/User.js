
import React, { useContext } from "react";
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import { UserContext } from "../../context/UserContext";
export default function User() {
  const {  deleteUser} = useContext(UserContext);
    const user=JSON.parse(localStorage.getItem("user"))
    console.log(user)

    const handleDelete = () => {
      if (user) {
        if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
          deleteUser(user._id);
        }
      }
    };
  return (
    <>
    <div className='bg-orange-800'><Header/></div>
   <div className='p-5'>
   <div className='my-16'> <img className='rounded-full m-auto' width={100} height={100} src='/full-m2H7G6A0Z5b1K9K9.png' alt=''/></div>
    <div className='border w-full lg:w-1/2 m-auto text-start p-5 '>
   
      <p className='mb-9'>Fisrt Name : {user.firstName}</p>
      <p className='mb-9'>Last Name: {user.lastName}</p>
      <p className='mb-9'>Email: {user.email}</p>
      <p className='mb-9'>Address: {user.address}</p>
      <p className='mb-9'>Phone: {user.phone}</p>
    </div>
    <div className='lg:w-1/2 m-auto text-center mb-16'>
        <Link to={"/userSettings"}><button className='w-full mb-5 lg:w-1/2 bg-orange-800 text-center  text-white'>Update account</button></Link>
        <button className='w-full mb-5 lg:w-1/2 bg-gray-300 text-center text-orange-950' onClick={handleDelete}>Delete account</button>
    </div>
   </div>
    </>
  )
}
