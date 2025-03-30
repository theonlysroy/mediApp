import { prismaClient } from "../../db";
import type { DbTables } from "./dbInsert";

type UpdateData<T> = T & Record<string, any>;

export async function dbUpdate<T>(
  tableName: DbTables,
  id: string,
  data: UpdateData<T>,
): Promise<T | null | "no record"> {
  try {
    const existingRecord = await (prismaClient as any)[tableName].findUnique({
      where: { id },
    });

    if (!existingRecord) {
      return "no record";
    }

    const updatedRecord = await (prismaClient as any)[tableName].update({
      where: { id },
      data,
      omit: {
        password: true,
      },
    });

    if (!updatedRecord) {
      return null;
    }

    return updatedRecord;
  } catch (error: any) {
    return null;
  }
}
