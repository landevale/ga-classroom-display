const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/seed", async (req, res) => {
  const users = [
    {
      username: "grapefruit",
      email: "pink@fruits.com",
      password: bcrypt.hashSync("fruitbasket", 10),
      admin: false,
    },
    {
      username: "testingt",
      email: "admin@test.com",
      password: bcrypt.hashSync("password123", 10),
      admin: true,
    },
  ];
  try {
    await User.deleteMany({}); //* delete all users
    const newUsers = await User.create(users);
    res.json(newUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  // Check for the presence of session data
  if (!req.session.username) {
    res.status(401).send("Unauthorized");
    return;
  }
  try {
    const users = await User.find({}).exec();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
