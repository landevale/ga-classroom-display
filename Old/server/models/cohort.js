const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      // uppercase: true,
      unique: true,
      required: [true, "can't be blank"],
      index: true,
      trim: true,
    },
    courseSchedule: {
      type: String,
      enum: ["FullTime", "PartTime"],
      trim: true,
    }, //PartTime or FullTime // trim
    startDate: {
      type: String,
      required: true,
      index: true,
    }, // dates
    endDate: {
      type: String,
      required: true,
      index: true,
    }, // dates
    daysOnCampus: {
      monday: { type: Boolean, default: false },
      tuesday: { type: Boolean, default: false },
      wednesday: { type: Boolean, default: false },
      thursday: { type: Boolean, default: false },
      friday: { type: Boolean, default: false },
    },
    startTime: { type: String }, //need start/end-time(?) Do we need to display "hours" in daily calendar?
    endTime: { type: String },
    classRoom: { type: Number, min: 1, max: 6, integer: true },
    weeks: { type: Number },
    studentSuccess: { type: String },
    altSaturdays: {
      type: String,
      required: true,
      default: "none",
      enum: ["none", "odd", "even", "all"],
    }, //none, odd, even, all
  },
  { timestamps: true }
);

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
