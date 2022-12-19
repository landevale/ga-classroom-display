const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const User = require("./user");

const bookingSchema = new mongoose.Schema(
  {
    roomUseBy: { type: String, required: true },
    // createdBy: { type: Schema.ObjectId, ref: User }, // check whether this user= admin or userOfRoom
    createdBy: { type: String, required: true },
    bookingStart: { type: String, required: true, index: true },
    bookingEnd: { type: String, required: true, index: true },
    classRoom: { type: Number },
    holiday: { type: Boolean, required: true },
    cohort: { type: String },
    bookingPurpose: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
