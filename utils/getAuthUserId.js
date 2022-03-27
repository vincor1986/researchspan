const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = getAuthUserId = (req) => {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.get("jwtSecret"));
  return decoded.user.id;
};
