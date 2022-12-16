const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const seed = require("../seed/seedBooking");

router.get("/seed", seed);

router.get("/", async (req, res) => {
  //? return [ list of bookings]
  try {
    const bookings = await Booking.find().exec();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// router.get("/seed", async (req, res) => {
//   const users = [
//     {
//       username: "grapefruit",
//       email: "pink@fruits.com",
//       password: "fruitbasket",
//     },
//   ];
//   try {
//     await User.deleteMany({}); //* delete all users
//     const newUsers = await User.create(users);
//     res.json(newUsers);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
