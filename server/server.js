// DEPENDENCIES
require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// Import
const bookingsController = require("./controllers/bookingsController.js");
// const Booking = require("./models/booking");
// const usersController = require("./controllers/usersController.js");
// const User = require("./models/user");

// CONFIGURATION
const app = express();
const PORT = process.env.PORT ?? 3000;

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("../client/dist"));
app.use("/bookings", bookingsController);
// app.use("/users", usersController);
// session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

// Connect to Mongo
const mongoURI = process.env.SECRET_KEY;
const db = mongoose.connection;
mongoose.set("runValidators", true); // here is your global setting
mongoose.set("strictQuery", false);
mongoose.set("debug", true);
mongoose.connect(mongoURI);

// Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

app.get("/api/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "client", "dist", "index.html"));
});

// Listener
db.once("open", () => {
  console.log("connected to mongo", mongoURI);
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
});
