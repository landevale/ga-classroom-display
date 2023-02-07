import * as Yup from "yup";

export const courseRegSchema = Yup.object().shape({
  courseCode: Yup.string().required("Course code is required"),
  courseSchedule: Yup.string()
    .oneOf(["FullTime", "PartTime"])
    .required("Course type is required"),
  startDate: Yup.date()
    .max(Yup.ref("endDate"), "Start date must be on or before End date")
    .required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date can't be before Start date")
    .required("End Date is required"),
  daysOnCampus: Yup.object().shape({
    monday: Yup.boolean(),
    tuesday: Yup.boolean(),
    wednesday: Yup.boolean(),
    thursday: Yup.boolean(),
    friday: Yup.boolean(),
  }),
  altSaturdays: Yup.string().required("Required"),
  startTime: Yup.string(),
  endTime: Yup.string(),
  classRoom: Yup.number().integer().positive().min(1).max(6),
});
