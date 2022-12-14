const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema(
  {
    cohort: {
      type: String,
      uppercase: true,
      unique: true,
      required: [true, "can't be blank"],
      index: true,
      trim: true,
    },
    type: { type: String, required: true },
    startDate: {
      type: Date,
      required: true,
      index: true,
    },
    endDate: {
      type: Date,
      required: true,
      index: true,
    },
    daysOnCampus: String,
    startTime: Number,
    endTime: Number,
    classRoom: Number,
    weeks: Number,
    altSaturdays: String,
  },
  { timestamps: true }
);

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
