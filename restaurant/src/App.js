import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from "./components/Footer/Footer";
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import About from './Pages/About/About';
import Contact from "./Pages/Contact/Contact";
import Home from './Pages/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Cart from './Pages/cart/Cart';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import User from './Pages/user/User';
import AccountSettings from './Pages/user/AccountSettings';
import Menu from './Pages/Menu';
import Layout from './layout/layout';
import Dashboard from './Pages/Dashboard/Dashboard';
import AllUsers from './Pages/Dashboard/AllUsers/AllUsers';
import AllFoods from './Pages/Dashboard/AllFoods/AllFoods';
import CreateFood from './Pages/Dashboard/AllFoods/CreateFood';
import UpdateFood from './Pages/Dashboard/AllFoods/UpdateFood';
import AllOrders from './Pages/Dashboard/AllOrders/AllOrders';
import Checkout from './Pages/Checkout/Checkout';
import { AnimatePresence } from 'framer-motion';
import Loader from './Pages/Loader';
import OrderSummary from './Pages/OrderSummary/OrderSummery';
import NotFound from './Pages/NotFound';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Simulating role fetching
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role || ''; // Default to an empty string if user data doesn't exist
  const isAdmin = userRole === 'admin';

  const isDashboard = location.pathname.startsWith('/dashboard');
  

  useEffect(() => {
    // Simulate a loading delay on initial page load
    const handleComplete = () => setLoading(false);
    setTimeout(handleComplete, 300);

    return () => clearTimeout(handleComplete);
  }, []); // Empty dependency array to ensure this runs only on the first load

  useEffect(() => {
    // Show loader on route change
    setLoading(true);
    const handleComplete = () => setLoading(false);
    setTimeout(handleComplete, 300);

    return () => clearTimeout(handleComplete);
  }, [location.pathname]);

  return (
    <div className="App">
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>
      {!loading && (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Dashboard routes protected by role */}
            <Route element={<Layout />}>
              {isAdmin ? (
                <>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/dashboard/users' element={<AllUsers />} />
                  <Route path='/dashboard/foods' element={<AllFoods />} />
                  <Route path='/dashboard/create' element={<CreateFood />} />
                  <Route path='/dashboard/update/:id' element={<UpdateFood />} />
                  <Route path='/dashboard/orders' element={<AllOrders />} />
                </>
              ) : (
                <Route path='/dashboard/*' element={<Navigate to="/not-found" replace />} />
              )}
            </Route>

            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/productDetails/:id' element={<ProductDetails />} />
            <Route path='/user' element={<User />} />
            <Route path='/userSettings' element={<AccountSettings />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order' element={<OrderSummary />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      )}
      {/* Conditionally render Footer based on dashboard path */}
      {!isDashboard && !loading && ! <Footer className="bottom-0" />}
    </div>
  );
}

export default App;
