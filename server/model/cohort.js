const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      // uppercase: true,
      unique: true,
      required: [true, "can't be blank"],
      index: true,
      trim: true,
    },
    type: { type: String, required: true }, //PartTime or FullTime
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
        //syntax (bring one line down into days and put in every single line)
        //need advice on whether okay to use boolean
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
    altSaturdays: { type: Number, required: true }, //0-3;m where, 0=none, 1=odd, 2=even, 3=ALL
  },
  { timestamps: true }
);

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
