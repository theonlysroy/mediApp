import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";
import { ApiError } from "../utils/ApiError";
import { consoleLogger as logger } from "../logger/consoleLogger";

export default function validate(schema: ZodSchema<any, any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        logger.error(`${req.originalUrl} => Validations failed`);
        // throw new ApiError(400, "Request validations failed", errorMessages);
        res.status(400).json({
          success: false,
          message: "Request validations failed",
          details: errorMessages,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          details: "",
        });
      }
    }
  };
}
