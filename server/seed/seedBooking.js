const Booking = require("../model/booking");

const seed = async (req, res) => {
  const seedBookings = [
    {
      roomUseBy: "SEi40",
      //user ref removed
      bookingStart: "2022-12-25",
      bookingEnd: "2022-12-30",
      classRoom: 4,
      holiday: false,
      //   cohort: { type: String },
      //   bookingPurpose: { type: String },
    },
    {
      roomUseBy: "SEi41",
      //user ref removed
      bookingStart: "2022-12-25",
      bookingEnd: "2022-12-30",
      classRoom: 5,
      holiday: false,
      //   cohort: { type: String },
      //   bookingPurpose: { type: String },
    },
    {
      roomUseBy: "New Year Eve Party",
      //user ref removed
      bookingStart: "2022-12-31",
      bookingEnd: "2022-12-31",
      classRoom: 2,
      holiday: false,
      //   cohort: { type: String },
      //   bookingPurpose: { type: String },
    },
  ];
  await Booking.deleteMany({});

  const bookings = await Booking.insertMany(seedBookings);

  res.json(bookings);
};

module.exports = seed;
