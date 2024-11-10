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
import AllUsers from './Pages/Dashboard/AllUsers/AllUsers';
import AllFoods from './Pages/Dashboard/AllFoods/AllFoods';
import CreateFood from './Pages/Dashboard/AllFoods/CreateFood';
import UpdateFood from './Pages/Dashboard/AllFoods/UpdateFood';
import AllOrders from './Pages/Dashboard/AllOrders/AllOrders';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="App">
     
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/users' element={<AllUsers/>}></Route>
            <Route path='/dashboard/foods' element={<AllFoods/>}>/</Route>
            <Route path='/dashboard/create' element={<CreateFood/>}>/</Route>
            <Route path='/dashboard/update/:id' element={<UpdateFood/>}>/</Route>
            <Route path='/dashboard/orders' element={<AllOrders/>}>/</Route>
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
