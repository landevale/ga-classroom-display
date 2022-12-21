const Cohort = require("../models/cohort");

const seed = async (req, res) => {
  const seedCohorts = [
    {
      courseCode: "SEI40",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-12-27T00:00:00.000+08:00",
      endDate: "2023-01-05T00:00:00.000+08:00",
      daysOnCampus: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: false,
          thursday: false,
          friday: false,
        },
      },
      startTime: "09:00",
      endTime: "17:00",
      classRoom: 2,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "none", //none, odd, even, ALL
    },

    {
      courseCode: "SEI41",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-12-27T00:00:00.000+08:00",
      endDate: "2023-01-05T00:00:00.000+08:00",
      daysOnCampus: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: false,
        },
      },
      startTime: "09:00",
      endTime: "17:00",
      classRoom: 4,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "none", //none, odd, even, ALL
    },
    {
      courseCode: "DSiFX07",
      courseSchedule: "PartTime", //PartTime or FullTime
      startDate: "2022-12-28T00:00:00.000+08:00",
      endDate: "2023-01-10T00:00:00.000+08:00",
      daysOnCampus: {
        days: {
          monday: false,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: false,
        },
      },
      startTime: "09:00",
      endTime: "18:00",
      classRoom: 5,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "odd", //none, odd, even, ALL
    },
    {
      courseCode: "ISOTest",
      courseSchedule: "PartTime", //PartTime or FullTime
      startDate: "2023-01-09T00:00:00.000+08:00",
      endDate: "2023-02-09T00:00:00.000+08:00",
      daysOnCampus: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: false,
          friday: false,
        },
      },
      startTime: "09:00",
      endTime: "18:00",
      classRoom: 5,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "all", //none, odd, even, ALL
    },
    {
      courseCode: "manBookInitLoadTest",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-12-22T00:00:00.000+08:00",
      endDate: "2022-02-24T00:00:00.000+08:00",
      daysOnCampus: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
        },
      },
      startTime: "09:00",
      endTime: "18:00",
      classRoom: 1,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "all", //none, odd, even, ALL
    },

    {
      courseCode: "OddSatCohort",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2023-02-01T00:00:00.000+08:00",
      endDate: "2023-02-27T00:00:00.000+08:00",
      daysOnCampus: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
        },
      },
      startTime: "09:00",
      endTime: "17:00",
      classRoom: 2,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "odd", //none, odd, even, ALL
    },

    {
      courseCode: "EvenSatCohort",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2023-02-01T00:00:00.000+08:00",
      endDate: "2023-02-27T00:00:00.000+08:00",
      daysOnCampus: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
        },
      },
      startTime: "09:00",
      endTime: "17:00",
      classRoom: 3,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "even", //none, odd, even, ALL
    },
  ];
  await Cohort.deleteMany({});

  const cohorts = await Cohort.insertMany(seedCohorts);

  res.json(cohorts);
};

module.exports = seed;
