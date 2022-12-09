const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "YuvrajSingh";

//create a user using: POST "/api/auth/". Doesn't require Auth

router.post(
  "/createuser",
  [
    body("email", "Enter a  Valid Name").isEmail(),
    body("password", "Password lenght must be 5 ").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let createUserSuccess = true;
    //if there is error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //check wether the email exist already
      let user = await User.findOne({ email: req.body.email });
      
      if (user) {
        createUserSuccess = false;
        return res
          .status(400)
          .json({createUserSuccess, error: "Sorry this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      

      res.json({createUserSuccess, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send( "some error occurred");
    }
    
    
  }
  
);

//  Route 2:  Authenticate the user using: POST "api/auth/login". No login required

router.post(
  "/login",
  [
    body("email", "Enter a  Valid Name").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there is error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Password or username not matched" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({success, error: "Password or username not matched" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: Get logged in user details using :Post "/api/auth/getUser". Login required

router.post("/getUser",fetchuser,async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
