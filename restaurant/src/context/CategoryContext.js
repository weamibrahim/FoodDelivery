import { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [searchP, setSearchP] = useState([]);
  const [x, setX] = useState(false);

  const salad = (products) => {
    setSearchP(products.filter((item) => item.category === "Salad"));
  setX(true)
  };

  const BreakFast = (products) => {
    setSearchP(products.filter((item) => item.category === "Breakfast"));
    setX(true);
  };

  const MainDishes = (products) => {
    setSearchP(
      products.filter(
        (item) => item.category === "Main dishes"
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
    setSearchP(products.filter((item) => item.category === "Juice"));
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
