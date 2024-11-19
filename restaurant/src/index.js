import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { CategoryProvider } from './context/CategoryContext';
import { UserProvider } from './context/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { CheckoutProvider } from './context/CheckoutContext';
import { AnimationProvider } from './context/AnimationContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AnimationProvider>
 <CategoryProvider>
  <CartProvider>
    <CheckoutProvider>
  <UserProvider>
  <BrowserRouter>
   <React.StrictMode>
  
    <App />
   
  </React.StrictMode>
  </BrowserRouter>
  </UserProvider>
  </CheckoutProvider>
  </CartProvider>
 </CategoryProvider>
 </AnimationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

