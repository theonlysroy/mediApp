import { JwtPayload } from "jsonwebtoken";
import "express";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    id?: string;
    email?: string;
  }
}

declare module "express" {
  interface Request {
    userId?: string;
  }
}
