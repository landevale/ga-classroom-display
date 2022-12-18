const express = require("express");
const router = express.Router();
const Cohort = require("../models/cohort");
// const seed = require("../seed/seedCohort");

// router.get("/seed", seed);

router.get("/", async (req, res) => {
  //? return [ list of cohortss]
  try {
    const cohorts = await Cohort.find().exec();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const cohort = await Cohort.create(req.body);
    res.status(201).json(cohort);
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
