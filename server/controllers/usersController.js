const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

// session

// router.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     // cookie: { secure: true },
//   })
// );


router.get("/", async (req, res) => {
  //? return [ list of bookings]
  try {
    const bookings = await Booking.find().exec();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  // Check for the presence of session data
  if (!req.session.username) {
    res.status(401).send("Unauthorized");
    return;
  }
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  // Check for the presence of session data
  if (!req.session.username) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndRemove(id);
    res.status(200).send(deletedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  // Check for the presence of session data
  if (!req.session.username) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { id } = req.params;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
