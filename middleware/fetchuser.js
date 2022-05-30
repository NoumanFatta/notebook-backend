var jwt = require("jsonwebtoken");
const secret = "MyNameIsNouman";
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("verify yourself with correct token");
  }
  try {
      const data= jwt.verify(token,secret);
      req.user = data;
      next();
  } catch (error) {
    res.status(401).send("verify yourself with correct token");
  }
};
module.exports = fetchUser;
