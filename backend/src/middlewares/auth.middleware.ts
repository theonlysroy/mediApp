import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { consoleLogger } from "../logger/consoleLogger";
import { ApiError } from "../utils/ApiError";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers["authorization"]?.replace("Bearer ", "") ||
      req.cookies?.token;

    if (!token) {
      consoleLogger.warn(`${req.originalUrl} => Unauthorized access, No token`);
      throw new ApiError(401, "Unauthorized request");
    }

    // check if the user token/session valid
    // call verifyJWT()
    if (token !== "my-access-token") {
      consoleLogger.warn(`${req.originalUrl} => Invalid access token`);
      throw new ApiError(401, "Invalid access token");
    }
    req.userId = "03650779-e684-4559-b9ed-023fac3f0ecd";
    next();
  } catch (error: any) {
    // consoleLogger.error(error.message);
    next(error);
  }
};

const verifyJWT = (token: string): JwtPayload | null => {
  const secret = process.env.TOKEN_SECRET as string;
  const decodedToken: JwtPayload = jwt.verify(token, secret) as JwtPayload;
  if (!decodedToken?.id) {
    return null;
  }
  return decodedToken;
};
