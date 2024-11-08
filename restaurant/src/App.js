import './App.css';
import Footer from "./components/Footer/Footer";
import {  Route, Routes, useLocation } from 'react-router-dom';

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

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="App">
     
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
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
        </Routes>

        {/* Conditionally render Footer based on dashboard path */}
        {!isDashboard && <Footer className="bottom-0" />}
   
    </div>
  );
}

export default App;
