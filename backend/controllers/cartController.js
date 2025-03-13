import userModel from "../models/userModel.js";
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Validate required fields
    if (!userId || !itemId) {
      return res.json({
        success: false,
        message: "User ID and Item ID are required",
      });
    }

    // Find the user
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Ensure cartData is initialized
    if (!userData.cartData || typeof userData.cartData !== "object") {
      userData.cartData = {};
    }

    // Update cartData
    userData.cartData[itemId] = (userData.cartData[itemId] || 0) + 1;

    // Save the updated user data
    await userData.save(); // ✅ Using save() instead of findByIdAndUpdate

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
