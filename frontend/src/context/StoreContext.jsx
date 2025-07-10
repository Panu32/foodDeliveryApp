import { createContext, use, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000/";

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
      if (updatedCart[itemId] <= 0) delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "api/food/list");
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  useEffect(() => {

    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();

  
  }, [])

const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const itemInfo = food_list.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
  }
  return totalAmount;
};



useEffect(() => {
  console.log("Cart Items:", cartItems);
}, [cartItems]);

useEffect(() => {
  fetchFoodList();
}, []);

const contextValue = {
  food_list,
  cartItems,
  setCartItems,
  addToCart,
  removeFromCart,
  url,
  token,
  setToken,
  setFoodList,
  getTotalCartAmount,
};

return (
  <StoreContext.Provider value={contextValue}>
    {props.children}
  </StoreContext.Provider>
);
};

export default StoreContextProvider;
