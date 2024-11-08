import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
   
      

<footer class="bg-orange-700 shadow  ">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <Link to={"/"} class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img
                src="/pngwing.com (10).png"
                alt="Your Company"
                className="h-11 w-7"
              />
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">LA RATATOULI</span>
            </Link>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-orange-100">
                <li>
                    <Link to={"/about"} class="hover:underline me-4 md:me-6">About</Link>
                </li>
                <li>
                    <Link to={"/menu"} class="hover:underline me-4 md:me-6">Menu</Link>
                </li>
                <li>
                    <Link to={"/cart"} class="hover:underline me-4 md:me-6">Cart</Link>
                </li>
                <li>
                    <Link to={"/contact"} class="hover:underline">Contact</Link>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-orange-100 sm:mx-auto  lg:my-8" />
        <span class="block text-sm  sm:text-center text-orange-100">© 2024 <a href="https://flowbite.com/" class="hover:underline"></a>. All Rights Reserved.</span>
    </div>
</footer>


   
  )
}
