const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.get("/seed", async (req, res) => {
  const users = [
    {
      username: "grapefruit",
      email: "pink@fruits.com",
      password: "fruitbasket",
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
  try {
    const users = await User.find({}).exec();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
