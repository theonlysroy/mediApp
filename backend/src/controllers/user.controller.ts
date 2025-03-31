import type { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import { consoleLogger as logger } from "../logger/consoleLogger";
import { dbDelete } from "../repository/dbDelete";
import { dbInsert } from "../repository/dbInsert";
import { dbUpdate } from "../repository/dbUpdate";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { dbRead, dbReadTotalItems } from "../repository/dbRead";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullName, email, password, dob } = req.body;
    const avatarLocalPath = req.file?.path;

    const newUser = {
      fullName,
      email,
      password: await bcrypt.hash(password, 10),
      dob,
      refreshToken: "",
      avatar: avatarLocalPath ?? "",
    };
    const result = await dbInsert<Prisma.UserUncheckedCreateInput>(
      "user",
      "email",
      newUser,
    );
    if (result === "exists") {
      logger.error("[createUser] => Email already registered");
      throw new ApiError(404, "Email already exists");
    }

    if (result === null) {
      logger.error("[createUser] => operation failed");
      throw new ApiError(404, "User creation failed");
    }

    // const { password: hashedPassword, ...data } = result;
    res
      .status(201)
      .json(new ApiResponse(201, "User registered successfully", result));
  } catch (error: any) {
    logger.error(error.message);
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { fullName, password } = req.body;
    const newUserData = {
      fullName,
      password: await bcrypt.hash(password, 10),
    };
    const result = await dbUpdate("user", id, newUserData);
    if (result === "no record") {
      logger.error("[updateUser] => User id doesn't exists");
      throw new ApiError(400, "Invalid user id given");
    }
    if (!result) {
      logger.error("[updateUser] => User update operation failed");
      throw new Error("Failed to update user details. Try again!!");
    }
    res
      .status(200)
      .json(new ApiResponse(200, "User details updated successfully", result));
  } catch (error: any) {
    logger.error(error.message);
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await dbDelete("user", id);
    if (result === "no record") {
      logger.error("[deleteUser] => User id doesn't exists");
      throw new ApiError(400, "Invalid user id given");
    }
    if (!result) {
      logger.error("[deleteUser] => User delete operation failed");
      throw new Error("Failed to delete user. Try again!!");
    }
    res.status(200).json(new ApiResponse(200, "User deleted successfully"));
  } catch (error: any) {
    logger.error(error.message);
    next(error);
  }
};

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, fullName, email, dob } = req.query;
    const whereClause = {
      fullName,
      email,
      dob,
    };
    const omitClause = {
      password: true,
    };

    const totalCount = await dbReadTotalItems("user");
    const totalPages = Math.ceil(totalCount / parseInt(limit as string));
    const offset =
      (parseInt(page as string) - 1) * parseInt(limit as string) + 1;
    const result = await dbRead(
      "user",
      parseInt(limit as string),
      offset,
      whereClause,
      omitClause,
      null,
    );
    if (!result) {
      logger.info("[getUserDetails] => No user details found.");
      throw new ApiError(404, "No user details found!!");
    }
    res.status(200).json(
      new ApiResponse(200, "User details fetched successfully", {
        users: result,
        totalPages,
        currentPage: parseInt(page as string),
        itemsPerPage: parseInt(limit as string),
      }),
    );
  } catch (error: any) {
    logger.error(error.message);
    next(error);
  }
};

export const getUserDetailsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const omitClause = {
      password: true,
    };
    const result = await dbRead("user", 10, 0, {}, omitClause, id);
    if (!result) {
      logger.info("[getUserDetails] => No user details found.");
      throw new ApiError(404, "No user details found!!");
    }
    res.status(200).json(
      new ApiResponse(200, "User details fetched", {
        details: result,
      }),
    );
  } catch (error: any) {
    logger.error(error.message);
    next(error);
  }
};
