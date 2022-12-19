const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/user.js");

sessions.get("/new", (req, res) => {
  res.render("sessions/new.ejs", { currentUser: req.session.currentUser });
});

// on sessions form submit (log in)
sessions.post("/", (req, res) => async () => {
  // username is found and password matches
  // successful log in

  // username is not found - who cares about password if you don't have a username that is found?
  // unsuccessful login

  // username found but password doesn't match
  // unsuccessful login

  // Step 1 Look for the username
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      res.send("<a hred=" / ">Sorry, no user found </a>");
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect("/");
      } else {
        res.send("<a href=" / ">Password does not match</a>");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = sessions;
