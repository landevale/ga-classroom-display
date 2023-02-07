//DEPENDENCIES
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const authRoutes = require("./routes/auth.js");

// Import
const bookingsController = require("./controllers/bookingsController.js");
const cohortsController = require("./controllers/cohortsController.js");
const User = require("./models/user.js");
const usersController = require("./controllers/usersController.js");

//Configuration
const app = express();
const PORT = process.env.PORT ?? 3000;

//MIDDLEWARE
app.use(express.static("../client/dist"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);
app.use(morgan("dev"));
app.use("/auth", authRoutes);
app.use("/api/bookings", bookingsController);
app.use("/api/cohorts", cohortsController);
app.use("/api/users", usersController);

// Connect to Mongo
const mongoURI = process.env.SECRET_KEY;
const db = mongoose.connection;
mongoose.set("runValidators", true); // here is your global setting
mongoose.set("strictQuery", false);
mongoose.set("debug", true);
mongoose.connect(mongoURI);

// Connection Error/Success
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

app.get("/api/", (req, res) => {
  res.json({ msg: "Hello World! It's the beginning of GA Classroom Display!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "client", "dist", "index.html"));
});

//Listener
db.once("open", () => {
  console.log("connected to mongo", mongoURI);
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  });
});
