import { createContext, useEffect, useState } from "react";
import axios from "axios"; 
import { toast } from "react-toastify";
import {food_list} from "../assets/assets"
export const StoreContext = createContext({});
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url="http://localhost:4000"
  const [token,setToken]=useState("")


const clearCart = async () => {
    setCartItems({});
     toast.success("Cart has been cleared!", {
     });

     if (token) {
       await axios.post(url + "/api/cart/clear", {}, { headers: { token } });
     }
}
  const addToCart = async(itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
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

 

const loadCartData=async (token)=>{
  const response =await axios.post(url+"/api/cart/get",{},{header:{token}})
  setCartItems(response.data.cartData)
}


useEffect(()=>{
    if (localStorage.getItem("token")) {
       setToken(localStorage.getItem("token"));
     }
  },[])
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
    clearCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}

    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
