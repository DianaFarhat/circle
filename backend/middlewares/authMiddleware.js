const jwt = require('jsonwebtoken');
const User = require("../models/userModel.js");
const { asyncHandler } = require("./asyncHandler.js");

exports.authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
      console.log("No token found in cookies");
      return res.status(401).json({ message: "Not authorized, no token." });
  }

  try {
      // 1️⃣ Decode the JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // ✅ Debugging

      // 2️⃣ Find the user and exclude password
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
          console.log("User not found in database");
          return res.status(401).json({ message: "User not found." });
      }

      // 3️⃣ Check if the password was changed after the token was issued
      if (user.passwordChangedAfterTokenIssued(decoded.iat)) {
          console.log("User changed password after token was issued");
          return res.status(401).json({ message: "Password changed. Please log in again." });
      }

      // 4️⃣ Attach user to request and proceed
      req.user = user;
      console.log("Authenticated User:", req.user);
      next();
  } catch (error) {
      console.error("JWT Verification Error:", error);
      return res.status(401).json({ message: "Not authorized, token failed." });
  }
});


//Used for use cases where authentication is optional, but grants features
exports.optionalAuthenticate = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
  
    // If no token, continue without authentication
    if (!token) {
        console.log("No token found in cookies, proceeding without user.");
        req.user = null;
        return next();
    }
  
    try {
        // Decode the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // ✅ Debugging
  
        // Find the user and exclude password
        const user = await User.findById(decoded.id).select("-password");
  
        if (!user) {
            console.log("User not found in database");
            req.user = null;
            return next();
        }
  
        // Check if the password was changed after the token was issued
        if (user.passwordChangedAfterTokenIssued(decoded.iat)) {
            console.log("User changed password after token was issued");
            req.user = null;
            return next();
        }
  
        // Attach user to request
        req.user = user;
        console.log("Authenticated User:", req.user);
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        req.user = null; // Continue without user if verification fails
        next();
    }
  });