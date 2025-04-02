import type { NextFunction, Request, Response } from "express";
import { consoleLogger } from "../logger/consoleLogger";
import { fLog } from "../logger";

export const addMedicineUsage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { drug, targetIllness, dosagePerDay, durationInDays } = req.body;
    const docs = req.files;
    res.status(200).json({
      message: "done...",
    });
  } catch (error: any) {
    consoleLogger.error(error.message);
    fLog.error(error);
    next(error);
  }
};

export const addPastSurgeries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error: any) {
    consoleLogger.error(error.message);
    fLog.error(error);
    next(error);
  }
};

export const addAllergies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error: any) {
    consoleLogger.error(error.message);
    fLog.error(error);
    next(error);
  }
};
