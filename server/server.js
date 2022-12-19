// DEPENDENCIES
require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Import
const bookingsController = require("./controllers/bookingsController.js");
const cohortsController = require("./controllers/cohortsController.js");
const User = require("./models/user");
const usersController = require("./controllers/usersController.js");
const sessionsController = require("./controllers/sessionsController.js");

// CONFIGURATION
const app = express();
const PORT = process.env.PORT ?? 3000;

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("../client/dist"));
app.use("/bookings", bookingsController);
app.use("/cohorts", cohortsController);
app.use("/users", usersController);
// session
app.use("/sessions", sessionsController);
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (user === null) {
    return res.status(401).json({ msg: "Not found" });
  }
  // if (password !== user.password)
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ msg: "Not valid" });
  }
  // set session data for the authenticated user
  req.session.userid = email;
  return res.json({ msg: "Valid" });
});

//* login - (sessions)
// app.post("/api/sessions", (req, res) => {
//   if (req.body.password === "123") {
//     req.session.login = "simon"; //? store something in session
//     res.json({ msg: "ok" });
//   } else {
//     res.status(401).json({ error: "Not Ok" });
//   }
// });

// app.delete("/api/sessions", (req, res) => {
//   req.session.destroy(() => {
// res.json({ msg: "Logout success" });
//   });
// });

const checkLogin = (req, res, next) => {
  // const { email } = req.body;
  // if (req.session.userid !== email) {
  if (!req.session.userid) {
    //? matches login -> check
    res.status(401).json({ msg: "Cannot see" });
  } else {
    next();
  }
};

app.get("/api/secret", [checkLogin], (req, res) => {
  res.json({ msg: "Need more milo" });
});

app.get("/api/secret2", (req, res) => {
  res.json({ msg: "Need more snacks" });
});

app.get("/sessions/logout", function (req, res) {
  req.session.destroy(() => {
    res.json({ msg: "Logout success" });
    // res.redirect("/logout");
  });
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
