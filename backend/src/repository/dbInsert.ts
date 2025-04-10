import type {
  Allergies,
  MedicineUsage,
  PastSurgeries,
  Prisma,
  Session,
  SubscriptionPlan,
  User,
} from "@prisma/client";
import { prismaClient } from "../../db";

export type DbTables =
  | "user"
  | "session"
  | "subscriptionPlan"
  | "medicineUsage"
  | "pastSurgeries"
  | "allergies";

type InsertData<T> = T & Record<string, any>;
type PrismaCreateModelMap = {
  user: {
    create: Prisma.UserCreateInput;
    return: User;
  };
  session: {
    create: Prisma.SessionUncheckedCreateInput;
    return: Session;
  };
  subscriptionPlan: {
    create: Prisma.SubscriptionPlanUncheckedCreateInput;
    return: SubscriptionPlan;
  };
  medicineUsage: {
    create: Prisma.MedicineUsageUncheckedCreateInput;
    return: MedicineUsage;
  };
  pastSurgeries: {
    create: Prisma.PastSurgeriesUncheckedCreateInput;
    return: PastSurgeries;
  };
  allergies: {
    create: Prisma.AllergiesUncheckedCreateInput;
    return: Allergies;
  };
};

export async function dbInsert<T>(
  tableName: DbTables,
  uniqueKey: keyof T,
  data: InsertData<T>,
): Promise<T | null | "exists"> {
  try {
    const existingRecord = await (prismaClient as any)[tableName].findUnique({
      where: { [uniqueKey]: (data as any)[uniqueKey] },
      omit: {
        password: true,
      },
    });

    if (existingRecord) {
      return "exists";
    }

    const insertedRecord = await (prismaClient as any)[tableName].create({
      data,
    });

    return insertedRecord;
  } catch (error: any) {
    return null;
  }
}

export async function dbInsertUnique<T extends DbTables>(
  tableName: T,
  data: PrismaCreateModelMap[T]["create"],
): Promise<PrismaCreateModelMap[T]["return"] | null> {
  try {
    const insertedRecord = await (prismaClient as any)[tableName].create({
      data,
    });
    prismaClient.session.create({
      data: {
        userId,
      },
    });
    return insertedRecord;
  } catch (error: any) {
    return null;
  }
}
