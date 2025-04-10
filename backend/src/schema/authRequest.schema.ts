import { z, type ZodSchema } from "zod";

export const loginUserSchema: ZodSchema<any> = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: z.string(),
      referrer: z.enum(["APP", "WEBSITE"]),
      deviceInfo: z.string().optional(),
    })
    .refine(
      ({ referrer, deviceInfo }) => {
        if (referrer === "APP" && !deviceInfo) {
          return false;
        }
        return true;
      },
      {
        message: "Device info is required for referrer 'APP'",
        path: ["deviceInfo"],
      },
    ),
});

export const refreshAccessTokenSchema: ZodSchema<any> = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
});

export const logoutUserSchema: ZodSchema<any> = z.object({
  body: z.object({
    revokeAll: z.boolean(),
  }),
});
