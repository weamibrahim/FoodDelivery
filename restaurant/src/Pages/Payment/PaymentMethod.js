
import React, { useState } from "react";
import OrderSummery from "../OrderSummary/OrderSummery";
export default function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState("Visa");

 

  return (
    <>
    <OrderSummery></OrderSummery>
    </>
  );
};



   
  

