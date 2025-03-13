import userModel from "../models/userModel.js";

// Add items to the user's cart
const addToCart = async (req, res) => {
  try {
    // Validate userId
    if (!req.body.userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    // Find the user
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // Update cartData
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // Save the updated cartData
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove items from the user's cart
const removeFromCart = async (req, res) => {
  try {
    // Validate userId
    if (!req.body.userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    // Find the user
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // Update cartData
    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1;
    } else {
      delete cartData[req.body.itemId]; // Remove the item if quantity is 1 or less
    }

    // Save the updated cartData
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Fetch the user's cart data
const getCart = async (req, res) => {
  try {
    // Validate userId
    if (!req.body.userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    // Find the user
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // Return cartData
    let cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
