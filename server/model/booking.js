const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./users");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: Schema.ObjectId, ref: User },
    bookingStart: { Date, required: true },
    bookingEnd: { Date, required: true },
    classRoom: { Number, required: true },
    cohort: String,
    purpose: String,
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
