import jwt from "jsonwebtoken";
export const isLoggedIn = (req, res, next) => {
  try {
    let token = req.get("Authorization");
    if (!token) {
      return res.status(200).json({
        error: true,
        status: "401",
        message: "Token was not found",
      });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "accessSecret");
    req.email = decoded.email;
    next();
  } catch (error) {
    return res
      .status(200)
      .json({ error: true, status: "401", message: error.message });
  }
};
