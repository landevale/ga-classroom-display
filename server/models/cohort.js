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
    courseSchedule: { type: String }, //PartTime or FullTime // trim
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
      days: {
        monday: { type: Boolean, default: false },
        tuesday: { type: Boolean, default: false },
        wednesday: { type: Boolean, default: false },
        thursday: { type: Boolean, default: false },
        friday: { type: Boolean, default: false },
      },
    }, // remove the nest
    startTime: { type: String }, //need start/end-time(?) Do we need to display "hours" in daily calendar?
    endTime: { type: String },
    classRoom: { type: Number },
    weeks: { type: Number },
    studentSuccess: { type: String },
    altSaturdays: { type: String, required: true }, //none, odd, even, ALL
  },
  { timestamps: true }
);

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
