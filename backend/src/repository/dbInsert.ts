import { prismaClient } from "../../db";

export type DbTables =
  | "user"
  | "session"
  | "subscriptionPlan"
  | "medicineUsage"
  | "pastSurgeries"
  | "allergies";

type InsertData<T> = T & Record<string, any>;

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
