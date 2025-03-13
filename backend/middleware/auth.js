import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Extract token from the Authorization header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "Not authorized, Login again" });
  }

  try {
    // Verify the token using the JWT_SECRET
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the userId to the request object (req.userId) for use in other parts of the app
    req.body.userId = decodedToken.id;
 

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, message: "Invalid token, Please login again" });
  }
};

export default authMiddleware;
