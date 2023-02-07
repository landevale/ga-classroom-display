import * as Yup from "yup";

export const bookingSchema = Yup.object().shape({
  roomUseBy: Yup.string().required("Is required"),
  createdBy: Yup.string(),
  bookingStart: Yup.date()
    .max(Yup.ref("bookingEnd"), "Start date must be on or before End date")
    .required("Start date is required"),
  bookingEnd: Yup.date()
    .min(Yup.ref("bookingStart"), "End date can't be before Start date")
    .required("End Date is required"),
  classRoom: Yup.number().integer().positive().min(1).max(6).nullable(true),
  holiday: Yup.boolean().required(),
  cohort: Yup.string(),
  bookingPurpose: Yup.string(),
});
