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

export const getUserDetailsSchema = z.object({
  query: z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    dob: z.string().date().optional(),
    page: z.string(),
    limit: z.string(),
  }),
});

export const getUserDetailsByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  query: z.object({
    page: z.string().min(1),
    limit: z.string().optional(),
  }),
});
