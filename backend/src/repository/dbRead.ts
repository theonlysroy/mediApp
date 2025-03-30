import { prismaClient } from "../../db";
import type { DbTables } from "./dbInsert";

export async function dbRead<T>(
  tableName: DbTables,
  limit: number = 10,
  offset: number = 0,
  where: any,
  id?: string | undefined,
): Promise<T | Array<any> | null> {
  try {
    if (id) {
      return await (prismaClient as any)[tableName].findUnique({
        where: { id },
        omit: {
          password: true,
        },
      });
    }
    const tableRecords = await prismaClient.user.findMany({
      where,
      take: limit,
      skip: offset,
    });
    return tableRecords;
  } catch (error: any) {
    return null;
  }
}

export async function dbReadTotalItems(
  tableName: string,
  itemsPerPage: number,
): Promise<number | null> {
  try {
    const totalRecords = await (prismaClient as any)[tableName].count();
    if (!totalRecords) {
      return null;
    }
    return Math.floor(totalRecords / itemsPerPage);
  } catch (error: any) {
    return null;
  }
}
