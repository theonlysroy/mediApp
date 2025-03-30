import { prismaClient } from "../../db";
import type { DbTables } from "./dbInsert";

export async function dbDelete<T>(
  tableName: DbTables,
  id: string,
): Promise<T | null | "no record"> {
  try {
    const existingRecord = await (prismaClient as any)[tableName].findUnique({
      where: { id },
    });

    if (!existingRecord) {
      return "no record";
    }

    const deletedRecord = await (prismaClient as any)[tableName].update({
      where: { id },
      omit: {
        password: true,
      },
    });

    if (!deletedRecord) {
      return null;
    }

    return deletedRecord;
  } catch (error: any) {
    return null;
  }
}
