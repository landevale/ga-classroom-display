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

router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
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
