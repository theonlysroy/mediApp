import { prismaClient } from "../../db";
import type { DbTables } from "./dbInsert";
import { Prisma } from "@prisma/client";

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
    return -1;
  }
}

export async function readUser(
  where: Prisma.UserWhereInput,
  limit: number,
  offset: number,
) {}
