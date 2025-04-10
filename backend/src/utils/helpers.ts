import type { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.TOKEN_SECRET as string;
const jwtAlgorithm = process.env.JWT_ALGORITHM as string;

export const generateToken = (
  payload: JwtPayload,
  expiresIn = "1h",
): string => {
  return jwt.sign(payload, jwtSecret, {
    algorithm: jwtAlgorithm,
    expiresIn: expiresIn,
  } as SignOptions);
};
