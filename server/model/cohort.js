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
    courseSchedule: { type: String }, //PartTime or FullTime
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
    daysOnCampus: {
      days:
        {
          monday: { type: Boolean, required: true },
          tuesday: { type: Boolean, required: true },
          wednesday: { type: Boolean, required: true },
          thursday: { type: Boolean, required: true },
          friday: { type: Boolean, required: true },
        },
    },
    startTime: { type: Number, required: true }, //need start/end-time(?) Do we need to display "hours" in daily calendar?
    endTime: { type: Number, required: true },
    classRoom: { type: Number },
    weeks: { type: Number, required: true },
    studentSuccess:{type:String, required:true},
    altSaturdays: { type: String, required: true }, //none, odd, even, ALL
  },
  { timestamps: true }
);

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
