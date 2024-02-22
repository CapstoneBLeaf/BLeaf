const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");
const { getUserById } = require("../db/sqlHelperFunctions/users");

const authRequired = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded.id,
      firstname: decoded.firstname,
      lastname: decoded.lastname,
      username: decoded.username,
      email: decoded.email,
    };
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "Unauthorized",
    });
    throw new Error("Token invalid");
  }
  next();
};

function getUserFromRequest(req) {
  if (req.get("Authorization") == null) return;
  const token = req.get("Authorization").split(" ")[1];
  if (token == null) return;
  decoded = jwt.verify(token, JWT_SECRET);
  const user = getUserById(decoded.id);
  return user;
}

module.exports = { authRequired, getUserFromRequest };
