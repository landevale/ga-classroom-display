// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// Import
const usersController = require("./controllers/usersController.js");
// const User = require("./models/users");

// CONFIGURATION
const app = express();
const PORT = process.env.PORT ?? 3000;

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use("/users", usersController);
// session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

// Connect to Mongo
// const mongoURI = "mongodb://localhost:27017/basiccrud";
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

// Listener
db.once("open", () => {
  console.log("connected to mongo", mongoURI);
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
});
