import { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [searchP, setSearchP] = useState([]);
  const [x, setX] = useState(false);

  const salad = () => {

    setX(false);
  };

  const BreakFast = (products) => {
    setSearchP(products.filter((item) => item.category === "Rolls"));
    setX(true);
  };

  const MainDishes = (products) => {
    setSearchP(
      products.filter(
        (item) => item.category === "Pure Veg" || item.category === "Noodles"
      )
    );
    setX(true);
  };

  const Sandwich = (products) => {
    setSearchP(products.filter((item) => item.category === "Sandwich"));
    setX(true);
  };

  const desserts = (products) => {
    setSearchP(products.filter((item) => item.category === "Desserts"));
    setX(true);
  };

  const Juice = (products) => {
    setSearchP(products.filter((item) => item.category === "Cake"));
    setX(true);
  };

  const pasta = (products) => {
    setSearchP(products.filter((item) => item.category === "Pasta"));
    setX(true);
  };

  return (
    <CategoryContext.Provider
      value={{
        salad,
        MainDishes,
        BreakFast,
        Sandwich,
        desserts,
        Juice,
        pasta,
        searchP,
        x,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
