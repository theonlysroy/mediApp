import { z } from "zod";

export const addMedicineUsageSchema = z.object({
  body: z.object({
    drug: z.string(),
    targetIllness: z.string().array().min(1),
    dosagePerDay: z.string(),
    durationInDays: z.string().min(1),
  }),
});

export const addPastSurgeriesSchema = z.object({
  body: z.object({
    surgery: z.string(),
    category: z.string({
      required_error: "category should be the body part involved in surgery",
    }),
    date: z
      .string({ required_error: "Date must be in YYYY-MM-DD format" })
      .date(),
    doctor: z.string().optional(),
    hospital: z.string(),
  }),
});

export const addAllergiesSchema = z.object({
  body: z.object({
    allergy: z.string(),
    category: z.string().optional(),
    medicines: z.string().array().min(1),
  }),
});
