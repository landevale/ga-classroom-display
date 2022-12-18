const Cohort = require("../models/cohort");

const seed = async (req, res) => {
  const seedCohorts = [
    {
      courseCode: "SEI40",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-12-25",
      endDate: "2023-01-05",
      daysOnCampus: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: false,
          thursday: false,
          friday: false,
        },
      },
      startTime: 9,
      endTime: 17,
      classRoom: 4,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "none", //none, odd, even, ALL
    },
    ,
    {
      courseCode: "SEI41",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-12-27",
      endDate: "2023-01-07",
      daysOnCampus: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: false,
        },
      },
      startTime: 9,
      endTime: 17,
      classRoom: 4,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "none", //none, odd, even, ALL
    },
    ,
    {
      courseCode: "DSiFX07",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-12-28",
      endDate: "2023-01-10",
      daysOnCampus: {
        days: {
          monday: false,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: false,
        },
      },
      startTime: 9,
      endTime: 18,
      classRoom: 5,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "odd", //none, odd, even, ALL
    },
  ];
  await Cohort.deleteMany({});

  const cohorts = await Cohort.insertMany(seedCohorts);

  res.json(cohorts);
};

module.exports = seed;
