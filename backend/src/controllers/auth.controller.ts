import type { NextFunction, Request, Response } from "express";
import { consoleLogger } from "../logger/consoleLogger";
import { dbReadUnique } from "../repository/dbRead";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError";
import { dbInsertUnique } from "../repository/dbInsert";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/helpers";
import { ApiResponse } from "../utils/ApiResponse";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, referrer } = req.body;
    const ip = (req.headers["x-forwaded-for"] as string) || (req.ip as string);
    const deviceInfo = req.body.deviceInfo ?? req.headers["user-agent"];

    const selectFields = ["password", "isActive", "isDeleted"];
    const selectClause: { [key: string]: boolean } = {};
    selectFields.map((field: string) => (selectClause[field] = true));
    const user = await dbReadUnique("user", { email }, { ...selectClause });

    if (!user || user?.isDeleted || !user?.isActive) {
      throw new ApiError(404, "Email id doesn't exists");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) throw new ApiError(404, "Invalid credentials");

    // JWT payload
    const token = generateToken({ userId: user.id });
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const response = await dbInsertUnique("session", {
      userId: user.id,
      refreshToken: token,
      expiresAt,
      ip,
      deviceInfo,
      referrer,
    });
    if (!response) throw new ApiError(400, "Session generation failed");
    res.status(200).json(new ApiResponse(200, "Session created", { token }));
  } catch (error: any) {
    consoleLogger.error(error.message);
    next(error);
  }
};
