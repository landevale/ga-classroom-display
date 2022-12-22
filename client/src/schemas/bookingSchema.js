import * as Yup from "yup";

export const bookingSchema = Yup.object().shape({
  roomUseBy: Yup.string().required("Is required"),
  createdBy: Yup.string(),
  bookingStart: Yup.date().required("Start date is required"),
  bookingEnd: Yup.date().required("End Date is required"),
  classRoom: Yup.number().integer().positive().min(1).max(6).nullable(true),
  holiday: Yup.boolean().required(),
  cohort: Yup.string(),
  bookingPurpose: Yup.string(),
});

// roomUseBy: { type: String, required: true }, // trim
// createdBy: { type: String, required: true },
// bookingStart: { type: String, required: true, index: true }, // date
// bookingEnd: { type: String, required: true, index: true }, // date
// classRoom: { type: Number }, // min 1 max 6
// holiday: { type: Boolean, required: true },
// cohort: { type: String }, // trim
// bookingPurpose: { type: String }, // trim
