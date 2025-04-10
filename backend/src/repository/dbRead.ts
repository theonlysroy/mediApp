import { prismaClient } from "../../db";
import { fLog } from "../logger";
import type { DbTables } from "./dbInsert";
// import { Prisma } from "@prisma/client";
import type {
  Prisma,
  User,
  Allergies,
  MedicineUsage,
  PastSurgeries,
  Session,
  SubscriptionPlan,
} from "@prisma/client";

type PrismaModelMap = {
  user: {
    where: Prisma.UserWhereInput;
    omit: Prisma.UserOmit;
    select: Prisma.UserSelect;
    return: User;
  };
  session: {
    where: Prisma.SessionWhereInput;
    omit: Prisma.SessionOmit;
    select: Prisma.SessionSelect;
    return: Session;
  };
  subscriptionPlan: {
    where: Prisma.SubscriptionPlanWhereInput;
    omit: Prisma.SubscriptionPlanOmit;
    select: Prisma.SubscriptionPlanSelect;
    return: SubscriptionPlan;
  };
  medicineUsage: {
    where: Prisma.MedicineUsageWhereInput;
    omit: Prisma.MedicineUsageOmit;
    select: Prisma.MedicineUsageSelect;
    return: MedicineUsage;
  };
  pastSurgeries: {
    where: Prisma.PastSurgeriesWhereInput;
    omit: Prisma.PastSurgeriesOmit;
    select: Prisma.PastSurgeriesSelect;
    return: PastSurgeries;
  };
  allergies: {
    where: Prisma.AllergiesWhereInput;
    omit: Prisma.AllergiesOmit;
    select: Prisma.AllergiesSelect;
    return: Allergies;
  };
};

export async function dbRead<T>(
  tableName: DbTables,
  limit: number = 10,
  offset: number = 0,
  where: any,
  omit: any,
  id?: string | null,
): Promise<T | Array<any> | null> {
  try {
    if (id) {
      return await (prismaClient as any)[tableName].findUnique({
        where: { id },
        omit,
      });
    }
    const tableRecords = await (prismaClient as any)[tableName].findMany({
      where: where,
      omit: omit,
      take: limit,
      skip: offset,
    });
    return tableRecords;
  } catch (error: any) {
    fLog.error(error);
    return null;
  }
}

export async function dbReadTotalItems(tableName: string): Promise<number> {
  try {
    const totalRecords = await (prismaClient as any)[tableName].count();
    if (!totalRecords) {
      return -1;
    }
    return totalRecords;
  } catch (error: any) {
    fLog.error(error);
    return -1;
  }
}

export async function readUser(
  where: Prisma.UserWhereInput,
  limit: number,
  offset: number,
) {}

export async function dbReadUnique<T extends DbTables>(
  tableName: T,
  where: PrismaModelMap[T]["where"],
  select: PrismaModelMap[T]["select"],
): Promise<PrismaModelMap[T]["return"] | null> {
  try {
    const record = await (prismaClient as any)[tableName].findUnique({
      where,
      select,
    });
    return record;
  } catch (error: any) {
    fLog.error(error);
    return null;
  }
}
