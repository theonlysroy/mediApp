import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { consoleLogger } from "../logger/consoleLogger";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.headers["authorization"]?.replace("Bearer ", "") || req.cookies?.token;

  if (!token) {
    consoleLogger.warn(`${req.originalUrl} => Unauthorized access, No token`);
    throw new ApiError(401, "Unauthorized request");
  }

  // check if the user token/session valid
  // call verifyJWT()

  req.userId = "03650779-e684-4559-b9ed-023fac3f0ecd";
};

const verifyJWT = (token: string): JwtPayload | null => {
  const secret = process.env.TOKEN_SECRET as string;
  const decodedToken: JwtPayload = jwt.verify(token, secret) as JwtPayload;
  if (!decodedToken?.id) {
    return null;
  }
  return decodedToken;
};
