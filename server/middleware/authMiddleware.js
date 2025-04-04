import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // we are sending token from the frontend in the header so get the full authorization header

  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }
  const token = authHeader.split(" ")[1]; // extract only the token part
  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach decoded user to request
    req.user = decoded;
    //proceed to next middleware/route handler
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

export default authMiddleware;
