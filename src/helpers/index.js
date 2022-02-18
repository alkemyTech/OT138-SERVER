import jwt from "jsonwebtoken";

export const verifyRefresh = ({ email, refreshToken }) => {
  try {
    const decoded = jwt.verify(refreshToken, "refreshSecret");
    if (decoded.email === email) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
