import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { GiShoppingCart } from "react-icons/gi";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const navigation = [
  
  { name: 'Home', href: '/', current: true },
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Menu', href: '/menu', current: false },
  { name: 'Contact us', href: '/contact', current: false },
  { name: 'About', href:'/about', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const handleSignOut = () => {
    // Add your sign-out logic here
    localStorage.removeItem("user");
 
  };
const {cart}=useContext(CartContext)
const cartCount=cart.length
  return (
    <Disclosure as="nav">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center mr-5 rounded-md p-2 text-orange-700 bg-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <div
                aria-hidden="true"
                className="block   group-data-[open]:hidden"
             
              
              ><IoIosMenu/></div>
              <div
                aria-hidden="true"
                className="hidden group-data-[open]:block"
                src="/your-close-icon.png"
                alt="Close menu" 
              ><MdOutlineRestaurantMenu/></div>
            </DisclosureButton>
            <div className="flex flex-shrink-0 items-center">
              <img
                src="/pngwing.com (10).png"
                alt="Your Company"
                className="h-11 w-7"
              />
            </div>
          </div>
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
              <img
                src="/pngwing.com (10).png"
                alt="Your Company"
                className="h-12 w-auto hidden md:block"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={
                       'text-white hover:bg-orange-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }

                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              to={"/cart"}
              className="relative rounded-full bg-white p-2 text-orange-600 hover:bg-orange-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <GiShoppingCart />
              <div className='absolute bg-orange-800  h-5 w-5 text-center rounded-full text-white -top-2 -right-2'>{cartCount}</div>
            </Link>

            {/* Profile dropdown */}
            {user ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="User Profile"
                      src="/pngegg (2).png"
                      className="h-8 w-8 rounded-full bg-white"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/user"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Your Profile
                      </Link>
                    )}
                  </MenuItem>
                 <Link to={"/login"}> <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={classNames(active ? 'bg-gray-100' : '', 'block w-full px-4 py-2  text-sm text-gray-700')}
                      >
                        Sign out
                      </button>
                    )}
                  </MenuItem></Link>
                </MenuItems>
              </Menu>
            ) : (
              <Link to="/login">
                <button className="bg-orange-700 p-2 w-20 ml-5 text-white rounded-lg">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={
                'text-white hover:bg-orange-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
              }
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
