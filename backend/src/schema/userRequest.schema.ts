import { z, ZodSchema } from "zod";

export const createUserSchema: ZodSchema<any> = z.object({
  body: z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(12),
    dob: z.string({ required_error: "DOB must be in YYYY-MM-DD" }).date(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    fullName: z.string(),
    password: z.string().min(8).max(12),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
