const express = require("express");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const checkAuth = require("../middleware/checkAuth.js");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      data: "",
      error: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        data: "",
        error: [
          {
            msg: "Invalid Credentials",
          },
        ],
      });
    }

    const token = await JWT.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );

    return res.status(200).json({
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      },
      error: "",
    });
  } catch (error) {
    return res.status(400).json({
      data: "",
      error: [
        {
          msg: error.message,
        },
      ],
    });
  }
});

router.get("/user", checkAuth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });
    // return res.status(200).json(user)
    return res.status(200).json({
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
      },
      error: "",
    });
  } catch (error) {
    return res.status(400).json({
      data: "",
      error: error.message,
    });
  }
});

module.exports = router;
