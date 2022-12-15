const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./users");

const bookingSchema = new mongoose.Schema(
  {
    roomUseBy: { type: Schema.ObjectId, ref: User }, // check whether this user= admin or userOfRoom
    bookingStart: { Date, required: true },
    bookingEnd: { Date, required: true },
    classRoom: { type: Number },
    holiday: { type: Boolean, required: true },
    cohort: { type: String },
    bookingPurpose: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
