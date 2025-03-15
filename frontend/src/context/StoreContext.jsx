import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const StoreContext = createContext({});
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => ({}));

  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const clearCart = async () => {
    setCartItems({});
    toast.success("Cart has been cleared!", {});

    if (token) {
      await axios.post(url + "/api/cart/clear", {}, { headers: { token } });
    }
  };
  const addToCart = async (itemId) => {
    if (!cartItems) {
      setCartItems({ [itemId]: 1 });
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    }

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success("Item added to cart");
        }
      } catch (error) {
        console.error("Error in addToCart:", error);
        toast.error("Failed to add item to cart");
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response = await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Item Removed from Cart");
      } 
      else {
        toast.error("Something went wrong");
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      alert("Error! Products are not fetching..");
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData || {}); 
  };

useEffect(() => {
  async function loadData() {
    await fetchFoodList();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); 
    }
  }
  loadData();
}, []);

useEffect(() => {
  if (token) {
    loadCartData(token); 
  }
}, [token]);



  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    clearCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
