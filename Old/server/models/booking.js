const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const User = require("./user");

const bookingSchema = new mongoose.Schema(
  {
    roomUseBy: { type: String, required: true }, // trim
    // createdBy: { type: Schema.ObjectId, ref: User }, // check whether this user= admin or userOfRoom
    createdBy: { type: String },
    bookingStart: { type: String, required: true, index: true }, // date
    bookingEnd: { type: String, required: true, index: true }, // date
    classRoom: { type: Number, min: 1, max: 6, integer: true }, // min 1 max 6
    holiday: { type: Boolean, required: true },
    cohort: { type: String }, // trim
    bookingPurpose: { type: String }, // trim
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
