const Cohort = require("../models/cohort");

const seed = async (req, res) => {
  const seedCohorts = [
    {
      courseCode: "SEi40",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-10-24",
      endDate: "2023-01-27",
      daysOnCampus: {
        monday: true,
        tuesday: true,
        wednesday: false,
        thursday: false,
        friday: false,
      },
      startTime: "09:00",
      endTime: "17:00",
      classRoom: 4,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "none", //none, odd, even, ALL
    },

    {
      courseCode: "SEI41",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-12-27",
      endDate: "2023-01-05",
      daysOnCampus: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: false,
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
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-08-23",
      endDate: "2023-03-04",
      daysOnCampus: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
      },
      startTime: "09:00",
      endTime: "18:00",
      classRoom: 5,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "odd", //none, odd, even, ALL
    },
    {
      courseCode: "SEiFX11",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-08-16",
      endDate: "2023-02-25",
      daysOnCampus: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
      },
      startTime: "09:00",
      endTime: "18:00",
      classRoom: 1,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "odd", //none, odd, even, ALL
    },
    {
      courseCode: "UXDiFX05",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-08-30",
      endDate: "2023-03-11",
      daysOnCampus: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
      },
      startTime: "09:00",
      endTime: "18:00",
      classRoom: 3,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "odd", //none, odd, even, ALL
    },
    {
      courseCode: "UXDi41",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-12-22",
      endDate: "2022-02-24",
      daysOnCampus: {
        monday: false,
        tuesday: false,
        wednesday: true,
        thursday: true,
        friday: false,
      },
      startTime: "09:00",
      endTime: "18:00",
      classRoom: 1,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "none", //none, odd, even, ALL
    },

    {
      courseCode: "DSi33",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-10-24",
      endDate: "2023-01-27",
      daysOnCampus: {
        monday: false,
        tuesday: false,
        wednesday: true,
        thursday: true,
        friday: false,
      },
      startTime: "09:00",
      endTime: "17:00",
      classRoom: 5,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "none", //none, odd, even, ALL
    },

    {
      courseCode: "SEiFX12",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-10-29",
      endDate: "2023-05-13",
      daysOnCampus: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
      },
      startTime: "09:00",
      endTime: "17:00",
      classRoom: 1,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "odd", //none, odd, even, ALL
    },
    {
      courseCode: "DXiFX09",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-11-12",
      endDate: "2023-05-27",
      daysOnCampus: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
      },
      startTime: "09:00",
      endTime: "17:00",
      classRoom: 6,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "odd", //none, odd, even, ALL
    },

    {
      courseCode: "UXDi42",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-11-21",
      endDate: "2023-02-24",
      daysOnCampus: {
        monday: false,
        tuesday: false,
        wednesday: true,
        thursday: true,
        friday: false,
      },
      startTime: "09:00",
      endTime: "17:00",
      classRoom: 6,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "none", //none, odd, even, ALL
    },

    {
      courseCode: "DSi34",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-11-28",
      endDate: "2023-03-03",
      daysOnCampus: {
        monday: true,
        tuesday: true,
        wednesday: false,
        thursday: false,
        friday: false,
      },
      startTime: "09:00",
      endTime: "17:00",
      classRoom: 5,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "none", //none, odd, even, ALL
    },

    {
      courseCode: "expired",
      courseSchedule: "FullTime", //PartTime or FullTime
      startDate: "2022-12-05",
      endDate: "2022-12-20",
      daysOnCampus: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
      },
      startTime: "09:00",
      endTime: "17:00",
      classRoom: 4,
      weeks: 2,
      studentSuccess: "Kerin",
      altSaturdays: "all", //none, odd, even, ALL
    },
  ];
  await Cohort.deleteMany({});

  const cohorts = await Cohort.insertMany(seedCohorts);

  res.json(cohorts);
};

module.exports = seed;
