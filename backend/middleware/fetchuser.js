var jwt = require("jsonwebtoken");
const JWT_SECRET = "YuvrajSingh";

const fetchuser = (req, res, next) => {
  //get the user from the jwt token and append and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Access Denied" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Access Denied" });
  }
};

module.exports = fetchuser;
